const Booking = require('../models/Booking');
const Resort = require('../models/Resort');

const getRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Step 1: Get user's booking history
        const bookings = await Booking.find({ touristId: userId })
            .populate('resortId');

        // Step 2: Extract user preferences from booking history
        const districtCount = {};
        const categoryCount = {};
        const amenityCount = {};
        let totalPrice = 0;
        let priceCount = 0;

        bookings.forEach((booking) => {
            const resort = booking.resortId;
            if (!resort) return;

            // Count districts
            districtCount[resort.district] = (districtCount[resort.district] || 0) + 1;

            // Count categories
            categoryCount[resort.category] = (categoryCount[resort.category] || 0) + 1;

            // Count amenities
            resort.amenities.forEach((amenity) => {
                amenityCount[amenity] = (amenityCount[amenity] || 0) + 1;
            });

            // Track price range
            totalPrice += resort.pricePerNight;
            priceCount++;
        });

        // Step 3: Determine preferred district, category, avg price
        const preferredDistrict = Object.keys(districtCount).sort((a, b) => districtCount[b] - districtCount[a])[0];
        const preferredCategory = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a])[0];
        const avgPrice = priceCount > 0 ? totalPrice / priceCount : 3000;

        // Step 4: Get all approved resorts
        const allResorts = await Resort.find({ status: 'approved' });

        // Step 5: Score each resort
        const scored = allResorts.map((resort) => {
            let score = 0;

            // District match — highest weight
            if (preferredDistrict && resort.district === preferredDistrict) score += 40;

            // Category match
            if (preferredCategory && resort.category === preferredCategory) score += 20;

            // Price range match — within 30% of avg price
            if (priceCount > 0) {
                const priceDiff = Math.abs(resort.pricePerNight - avgPrice);
                const priceRange = avgPrice * 0.3;
                if (priceDiff <= priceRange) score += 20;
            }

            // Amenity overlap
            resort.amenities.forEach((amenity) => {
                if (amenityCount[amenity]) score += 5;
            });

            // Rating bonus
            score += resort.avgRating * 2;

            return { resort, score };
        });

        // Step 6: Sort by score and return top 5
        const topResorts = scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((item) => ({ ...item.resort.toObject(), score: item.score }));

        // Step 7: Build explanation
        let explanation = '';
        if (bookings.length === 0) {
            explanation = 'Showing top-rated resorts since you have no booking history yet. Book a resort to get personalized recommendations!';
        } else {
            explanation = `Based on your ${bookings.length} booking(s), you prefer ${preferredDistrict || 'hill'} resorts with an average budget of ৳${Math.round(avgPrice)}/night.`;
        }

        return res.status(200).json({
            recommendations: topResorts,
            explanation,
            preferences: {
                preferredDistrict,
                preferredCategory,
                avgPrice: Math.round(avgPrice),
                totalBookings: bookings.length
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getRecommendations };