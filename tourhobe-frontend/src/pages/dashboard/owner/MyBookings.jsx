import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const OwnerBookings = () => {
    const { currentUser } = useAuth();
    const [resorts, setResorts] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await currentUser.getIdToken();

                // Get owner's resorts first
                const resortsRes = await axios.get(
                    'https://tourhobe-backend.onrender.com/api/resorts/owner/my',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setResorts(resortsRes.data);

                // Get bookings for each resort
                const allBookings = [];
                for (const resort of resortsRes.data) {
                    try {
                        const bookingsRes = await axios.get(
                            `https://tourhobe-backend.onrender.com/api/bookings/resort/${resort._id}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        bookingsRes.data.forEach(b => {
                            allBookings.push({ ...b, resortName: resort.name });
                        });
                    } catch (err) {
                        console.log('No bookings for resort:', resort.name);
                    }
                }
                setBookings(allBookings);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        setUpdating(bookingId);
        try {
            const token = await currentUser.getIdToken();
            await axios.patch(
                `https://tourhobe-backend.onrender.com/api/bookings/${bookingId}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBookings(bookings.map(b =>
                b._id === bookingId ? { ...b, status: newStatus } : b
            ));
        } catch (error) {
            console.error('Failed to update booking:', error.message);
        }
        setUpdating(null);
    };

    if (loading) return (
        <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-6">📋 Bookings Received</h2>

            {bookings.length === 0 ? (
                <div className="text-center py-10">
                    <div className="text-5xl mb-4">📋</div>
                    <p className="text-gray-500">No bookings received yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-secondary text-lg">
                                            {booking.resortName}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            Tourist: {booking.touristId?.name} ({booking.touristId?.email})
                                        </p>
                                    </div>
                                    <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' :
                                            booking.status === 'pending' ? 'badge-warning' :
                                                booking.status === 'cancelled' ? 'badge-error' :
                                                    'badge-info'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                    <div className="bg-base-200 rounded-lg p-2">
                                        <p className="text-xs text-gray-400">Check-in</p>
                                        <p className="font-semibold text-sm">
                                            {new Date(booking.checkIn).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="bg-base-200 rounded-lg p-2">
                                        <p className="text-xs text-gray-400">Check-out</p>
                                        <p className="font-semibold text-sm">
                                            {new Date(booking.checkOut).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="bg-base-200 rounded-lg p-2">
                                        <p className="text-xs text-gray-400">Guests</p>
                                        <p className="font-semibold text-sm">{booking.guests}</p>
                                    </div>
                                    <div className="bg-base-200 rounded-lg p-2">
                                        <p className="text-xs text-gray-400">Total Price</p>
                                        <p className="font-semibold text-sm text-primary">
                                            ৳{booking.totalPrice}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {booking.status === 'pending' && (
                                    <div className="card-actions justify-end mt-3">
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleStatusChange(booking._id, 'confirmed')}
                                            disabled={updating === booking._id}
                                        >
                                            {updating === booking._id ?
                                                <span className="loading loading-spinner loading-sm"></span> :
                                                '✅ Confirm Booking'
                                            }
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleStatusChange(booking._id, 'cancelled')}
                                            disabled={updating === booking._id}
                                        >
                                            ❌ Reject
                                        </button>
                                    </div>
                                )}
                                {booking.status === 'confirmed' && (
                                    <div className="card-actions justify-end mt-3">
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() => handleStatusChange(booking._id, 'completed')}
                                            disabled={updating === booking._id}
                                        >
                                            ✔️ Mark Completed
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

export default OwnerBookings;