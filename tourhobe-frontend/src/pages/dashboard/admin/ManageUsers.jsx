import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const ManageUsers = () => {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    const fetchUsers = async () => {
        try {
            const token = await currentUser.getIdToken();
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (error) {
            console.error('Failed to fetch users:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        setUpdating(userId);
        try {
            const token = await currentUser.getIdToken();
            await axios.patch(`http://localhost:5000/api/users/${userId}/role`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            console.error('Failed to update role:', error.message);
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
            <h2 className="text-2xl font-bold text-secondary mb-6">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary text-white rounded-full w-8">
                                                <span className="text-sm">{user.name?.[0]}</span>
                                            </div>
                                        </div>
                                        <span className="font-semibold">{user.name}</span>
                                    </div>
                                </td>
                                <td className="text-gray-500 text-sm">{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'admin' ? 'badge-error' :
                                            user.role === 'owner' ? 'badge-warning' :
                                                'badge-success'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="text-gray-400 text-sm">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <select
                                        className="select select-bordered select-sm"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        disabled={updating === user._id}
                                    >
                                        <option value="tourist">Tourist</option>
                                        <option value="owner">Owner</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {updating === user._id && (
                                        <span className="loading loading-spinner loading-sm ml-2"></span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    No users found
                </div>
            )}
        </div>
    );
};

export default ManageUsers;