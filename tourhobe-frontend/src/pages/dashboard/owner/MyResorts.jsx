import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const MyResorts = () => {
    const { currentUser } = useAuth();
    const [resorts, setResorts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyResorts = async () => {
        try {
            const token = await currentUser.getIdToken();
            const res = await axios.get('https://tourhobe-backend.onrender.com/api/resorts/owner/my', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResorts(res.data);
        } catch (error) {
            console.error('Failed to fetch resorts:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMyResorts();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-6">🏝️ My Resorts</h2>

            {resorts.length === 0 ? (
                <div className="text-center py-10">
                    <div className="text-5xl mb-4">🏝️</div>
                    <p className="text-gray-500">You have no resorts yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resorts.map((resort) => (
                        <div key={resort._id} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    src={resort.images[0]}
                                    alt={resort.name}
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title">{resort.name}</h3>
                                <p className="text-gray-500">📍 {resort.district}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary font-bold">৳{resort.pricePerNight}/night</span>
                                    <span className={`badge ${resort.status === 'approved' ? 'badge-success' :
                                            resort.status === 'pending' ? 'badge-warning' :
                                                'badge-error'
                                        }`}>
                                        {resort.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyResorts;