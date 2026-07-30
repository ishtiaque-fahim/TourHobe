import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ResortDetail = () => {
    const { id } = useParams();
    const { currentUser, userRole } = useAuth();
    const navigate = useNavigate();

    const [resort, setResort] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Booking form state
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingMessage, setBookingMessage] = useState('');

    // Review form state
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewMessage, setReviewMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resortRes, reviewsRes] = await Promise.all([
                    axios.get(`https://tourhobe-backend.onrender.com/api/resorts/${id}`),
                    axios.get(`https://tourhobe-backend.onrender.com/api/reviews/resort/${id}`)
                ]);
                setResort(resortRes.data);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error('Failed to fetch resort:', error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const diff = new Date(checkOut) - new Date(checkIn);
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const handleBooking = async () => {
        if (!currentUser) return navigate('/login');
        if (!checkIn || !checkOut) return setBookingMessage('Please select check-in and check-out dates.');
        if (calculateNights() <= 0) return setBookingMessage('Check-out must be after check-in.');

        setBookingLoading(true);
        setBookingMessage('');
        try {
            const token = await currentUser.getIdToken();
            await axios.post('https://tourhobe-backend.onrender.com/api/bookings', {
                resortId: id,
                checkIn,
                checkOut,
                guests
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookingMessage('✅ Booking successful! Check your dashboard.');
            setCheckIn('');
            setCheckOut('');
            setGuests(1);
        } catch (error) {
            setBookingMessage('❌ Booking failed. ' + (error.response?.data?.message || error.message));
        }
        setBookingLoading(false);
    };

    const handleReview = async () => {
        if (!currentUser) return navigate('/login');
        if (!comment) return setReviewMessage('Please write a comment.');

        setReviewLoading(true);
        setReviewMessage('');
        try {
            const token = await currentUser.getIdToken();
            await axios.post('https://tourhobe-backend.onrender.com/api/reviews', {
                resortId: id,
                rating,
                comment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviewMessage('✅ Review submitted!');
            setComment('');
            setRating(5);
            // Refresh reviews
            const reviewsRes = await axios.get(`https://tourhobe-backend.onrender.com/api/reviews/resort/${id}`);
            setReviews(reviewsRes.data);
        } catch (error) {
            setReviewMessage('❌ ' + (error.response?.data?.message || error.message));
        }
        setReviewLoading(false);
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (!resort) return (
        <div className="text-center py-20">
            <p className="text-2xl">😔 Resort not found</p>
        </div>
    );

    const nights = calculateNights();
    const totalPrice = nights * resort.pricePerNight;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Resort Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-secondary mb-2">{resort.name}</h1>
                <div className="flex flex-wrap gap-3 items-center">
                    <span className="badge badge-primary">{resort.category}</span>
                    <span className="text-gray-500">📍 {resort.district}</span>
                    <span className="text-yellow-500">⭐ {resort.avgRating}</span>
                    <span className="text-gray-400">({resort.totalReviews} reviews)</span>
                </div>
            </div>

            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden mb-8 h-96">
                <img
                    src={resort.images[0]}
                    alt={resort.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column — Details */}
                <div className="lg:col-span-2">
                    {/* Description */}
                    <div className="card bg-base-100 shadow p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4">About this resort</h2>
                        <p className="text-gray-600 leading-relaxed">{resort.description}</p>
                    </div>

                    {/* Amenities */}
                    <div className="card bg-base-100 shadow p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                        <div className="flex flex-wrap gap-2">
                            {resort.amenities.map((amenity, i) => (
                                <span key={i} className="badge badge-outline badge-lg">{amenity}</span>
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="card bg-base-100 shadow p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
                        {reviews.length === 0 && (
                            <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                        )}
                        {reviews.map((review) => (
                            <div key={review._id} className="border-b pb-4 mb-4 last:border-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-white rounded-full w-10">
                                            <span>{review.touristId?.name?.[0] || 'T'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{review.touristId?.name || 'Tourist'}</p>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    {/* Submit Review */}
                    {currentUser && userRole === 'tourist' && (
                        <div className="card bg-base-100 shadow p-6">
                            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                            <div className="flex gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                    >
                                        ⭐
                                    </button>
                                ))}
                            </div>
                            <textarea
                                className="textarea textarea-bordered w-full mb-4"
                                placeholder="Share your experience..."
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            {reviewMessage && (
                                <p className="mb-4 text-sm">{reviewMessage}</p>
                            )}
                            <button
                                onClick={handleReview}
                                className="btn btn-primary"
                                disabled={reviewLoading}
                            >
                                {reviewLoading ? <span className="loading loading-spinner"></span> : 'Submit Review'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column — Booking Card */}
                <div className="lg:col-span-1">
                    <div className="card bg-base-100 shadow-xl sticky top-4">
                        <div className="card-body">
                            <h2 className="text-2xl font-bold text-primary">
                                ৳{resort.pricePerNight}
                                <span className="text-gray-400 text-sm font-normal">/night</span>
                            </h2>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Check-in</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered"
                                    value={checkIn}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Check-out</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered"
                                    value={checkOut}
                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold">Guests</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered"
                                    value={guests}
                                    min={1}
                                    max={20}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                />
                            </div>

                            {nights > 0 && (
                                <div className="bg-base-200 rounded-lg p-3 mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>৳{resort.pricePerNight} × {nights} nights</span>
                                        <span>৳{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between font-bold border-t pt-2">
                                        <span>Total</span>
                                        <span className="text-primary">৳{totalPrice}</span>
                                    </div>
                                </div>
                            )}

                            {bookingMessage && (
                                <p className="text-sm mb-4">{bookingMessage}</p>
                            )}

                            <button
                                onClick={handleBooking}
                                className="btn btn-primary w-full"
                                disabled={bookingLoading}
                            >
                                {bookingLoading ? <span className="loading loading-spinner"></span> : currentUser ? 'Book Now' : 'Login to Book'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResortDetail;