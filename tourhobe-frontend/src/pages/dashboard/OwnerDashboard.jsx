const OwnerDashboard = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Resort Owner Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">🏝️</div>
                        <h3 className="card-title justify-center">My Resorts</h3>
                        <p>Create and manage your resort listings</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">Manage Resorts</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">📋</div>
                        <h3 className="card-title justify-center">Bookings Received</h3>
                        <p>View all bookings made at your resorts</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">View Bookings</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">💬</div>
                        <h3 className="card-title justify-center">Reviews</h3>
                        <p>See what tourists say about your resorts</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">View Reviews</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;