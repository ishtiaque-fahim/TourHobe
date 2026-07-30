import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const ManageResorts = () => {
    const { currentUser } = useAuth();
    const [resorts, setResorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);
    const [filter, setFilter] = useState('all');

    const fetchResorts = async () => {
        try {
            const token = await currentUser.getIdToken();
            const res = await axios.get('http://localhost:5000/api/resorts/admin/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResorts(res.data);
        } catch (error) {
            console.error('Failed to fetch resorts:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchResorts();
    }, []);

    const handleStatusChange = async (resortId, newStatus) => {
        setUpdating(resortId);
        try {
            const token = await currentUser.getIdToken();
            await axios.patch(`http://localhost:5000/api/resorts/${resortId}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResorts(resorts.map(r => r._id === resortId ? { ...r, status: newStatus } : r));
        } catch (error) {
            console.error('Failed to update status:', error.message);
        }
        setUpdating(null);
    };

    const filtered = filter === 'all' ? resorts : resorts.filter(r => r.status === filter);

    if (loading) return (
        <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-6">Manage Resorts</h2>

            {/* Filter Tabs */}
            <div className="tabs tabs-bordered mb-6">
                {['all', 'pending', 'approved', 'rejected'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${filter === tab ? 'tab-active' : ''}`}
                        onClick={() => setFilter(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        <span className="badge badge-sm ml-2">
                            {tab === 'all' ? resorts.length : resorts.filter(r => r.status === tab).length}
                        </span>
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Resort</th>
                            <th>District</th>
                            <th>Price/Night</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((resort, index) => (
                            <tr key={resort._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={resort.images[0]}
                                            alt={resort.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">{resort.name}</p>
                                            <p className="text-gray-400 text-sm">{resort.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{resort.district}</td>
                                <td className="text-primary font-semibold">৳{resort.pricePerNight}</td>
                                <td>
                                    <span className={`badge ${resort.status === 'approved' ? 'badge-success' :
                                        resort.status === 'pending' ? 'badge-warning' :
                                            'badge-error'
                                        }`}>
                                        {resort.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        {resort.status !== 'approved' && (
                                            <button
                                                className="btn btn-success btn-xs"
                                                onClick={() => handleStatusChange(resort._id, 'approved')}
                                                disabled={updating === resort._id}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {resort.status !== 'rejected' && (
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() => handleStatusChange(resort._id, 'rejected')}
                                                disabled={updating === resort._id}
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {updating === resort._id && (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    No resorts found
                </div>
            )}
        </div>
    );
};

export default ManageResorts;