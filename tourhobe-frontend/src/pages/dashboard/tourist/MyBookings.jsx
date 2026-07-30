import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const MyBookings = () => {
    const { currentUser } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(null);

    const fetchBookings = async () => {
        try {
            const token = await currentUser.getIdToken();
            const res = await axios.get('http://localhost:5000/api/bookings/my', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        setCancelling(bookingId);
        try {
            const token = await currentUser.getIdToken();
            await axios.patch(
                `http://localhost:5000/api/bookings/${bookingId}/cancel`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBookings(bookings.map(b =>
                b._id === bookingId ? { ...b, status: 'cancelled' } : b
            ));
        } catch (error) {
            console.error('Failed to cancel booking:', error.message);
        }
        setCancelling(null);
    };

    if (loading) return (
        <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-6">🏨 My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-center py-10">
                    <div className="text-5xl mb-4">🏨</div>
                    <p className="text-gray-500">You have no bookings yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Resort Image */}
                                    <img
                                        src={booking.resortId?.images?.[0]}
                                        alt={booking.resortId?.name}
                                        className="w-full md:w-32 h-32 object-cover rounded-xl"
                                    />
                                    {/* Booking Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold text-secondary">
                                                {booking.resortId?.name}
                                            </h3>
                                            <span className={`badge ${
                                                booking.status === 'confirmed' ? 'badge-success' :
                                                booking.status === 'pending' ? 'badge-warning' :
                                                booking.status === 'cancelled' ? 'badge-error' :
                                                'badge-info'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            📍 {booking.resortId?.district}
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                                            <div>
                                                <p className="text-xs text-gray-400">Check-in</p>
                                                <p className="font-semibold text-sm">
                                                    {new Date(booking.checkIn).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Check-out</p>
                                                <p className="font-semibold text-sm">
                                                    {new Date(booking.checkOut).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Guests</p>
                                                <p className="font-semibold text-sm">{booking.guests}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Total Price</p>
                                                <p className="font-semibold text-sm text-primary">
                                                    ৳{booking.totalPrice}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Cancel Button */}
                                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                    <div className="card-actions justify-end mt-2">
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleCancel(booking._id)}
                                            disabled={cancelling === booking._id}
                                        >
                                            {cancelling === booking._id ?
                                                <span className="loading loading-spinner loading-sm"></span> :
                                                'Cancel Booking'
                                            }
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;