import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const MyReviews = () => {
    const { currentUser } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = await currentUser.getIdToken();
                const res = await axios.get('http://localhost:5000/api/reviews/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReviews(res.data);
            } catch (error) {
                console.error('Failed to fetch reviews:', error.message);
            }
            setLoading(false);
        };
        fetchReviews();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-6">⭐ My Reviews</h2>

            {reviews.length === 0 ? (
                <div className="text-center py-10">
                    <div className="text-5xl mb-4">⭐</div>
                    <p className="text-gray-500">You have not written any reviews yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-secondary">
                                        {review.resortId?.name}
                                    </h3>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                                ⭐
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">📍 {review.resortId?.district}</p>
                                <p className="text-gray-600 mt-2">{review.comment}</p>
                                <p className="text-gray-400 text-xs mt-2">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReviews;