const AdminDashboard = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">👥</div>
                        <h3 className="card-title justify-center">Manage Users</h3>
                        <p>View all users and assign roles</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">View Users</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">🏝️</div>
                        <h3 className="card-title justify-center">Manage Resorts</h3>
                        <p>Approve or reject resort listings</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">View Resorts</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <h3 className="card-title justify-center">Analytics</h3>
                        <p>View platform statistics and reports</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">View Analytics</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;