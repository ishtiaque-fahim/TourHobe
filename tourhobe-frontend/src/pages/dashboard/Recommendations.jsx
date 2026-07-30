import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Recommendations = () => {
    const { currentUser } = useAuth();
    const [recommendations, setRecommendations] = useState([]);
    const [explanation, setExplanation] = useState('');
    const [preferences, setPreferences] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const token = await currentUser.getIdToken();
            const res = await axios.get('http://localhost:5000/api/recommendations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecommendations(res.data.recommendations);
            setExplanation(res.data.explanation);
            setPreferences(res.data.preferences);
            setFetched(true);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error.message);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-2">🤖 AI Recommendations</h2>
            <p className="text-gray-500 mb-6">
                Get personalized resort suggestions based on your booking history and preferences.
            </p>

            {/* Get Suggestions Button */}
            {!fetched && (
                <div className="text-center py-10">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Ready to find your perfect resort?</h3>
                    <p className="text-gray-500 mb-6">Our AI analyzes your booking history to suggest the best matches.</p>
                    <button
                        onClick={fetchRecommendations}
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : 'Get AI Suggestions'}
                    </button>
                </div>
            )}

            {/* Explanation Box */}
            {fetched && explanation && (
                <div className="alert bg-base-200 mb-6">
                    <span>🧠 {explanation}</span>
                </div>
            )}

            {/* Preferences Summary */}
            {fetched && preferences && preferences.totalBookings > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-xl">
                        <div className="stat-title">Total Bookings</div>
                        <div className="stat-value text-primary text-2xl">{preferences.totalBookings}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-xl">
                        <div className="stat-title">Fav District</div>
                        <div className="stat-value text-primary text-xl">{preferences.preferredDistrict || 'N/A'}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-xl">
                        <div className="stat-title">Fav Category</div>
                        <div className="stat-value text-primary text-xl">{preferences.preferredCategory || 'N/A'}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-xl">
                        <div className="stat-title">Avg Budget</div>
                        <div className="stat-value text-primary text-xl">৳{preferences.avgPrice}</div>
                    </div>
                </div>
            )}

            {/* Recommendations Grid */}
            {fetched && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-secondary">Top Picks For You</h3>
                        <button
                            onClick={fetchRecommendations}
                            className="btn btn-ghost btn-sm"
                            disabled={loading}
                        >
                            🔄 Refresh
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.map((resort, index) => (
                            <div key={resort._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                                {/* Rank Badge */}
                                <div className="relative">
                                    <img
                                        src={resort.images[0]}
                                        alt={resort.name}
                                        className="w-full h-40 object-cover rounded-t-2xl"
                                    />
                                    <div className="absolute top-2 left-2 badge badge-primary font-bold">
                                        #{index + 1} Pick
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title text-secondary text-base">{resort.name}</h3>
                                    <p className="text-gray-500 text-sm">📍 {resort.district}</p>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {resort.amenities.slice(0, 3).map((amenity, i) => (
                                            <span key={i} className="badge badge-outline badge-sm">{amenity}</span>
                                        ))}
                                    </div>

                                    {/* Rating & Price */}
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-yellow-500 text-sm">⭐ {resort.avgRating}</span>
                                        <span className="text-primary font-bold">৳{resort.pricePerNight}/night</span>
                                    </div>

                                    <Link
                                        to={`/resorts/${resort._id}`}
                                        className="btn btn-primary btn-sm w-full mt-2"
                                    >
                                        View Resort
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Recommendations;