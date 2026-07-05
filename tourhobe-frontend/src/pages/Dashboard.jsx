import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-primary mb-2">
                Welcome, {currentUser?.displayName}! 👋
            </h1>
            <p className="text-gray-500 mb-8">You are logged in as: {currentUser?.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">🏨</div>
                        <h3 className="card-title justify-center">My Bookings</h3>
                        <p>View and manage your resort bookings</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">View Bookings</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">⭐</div>
                        <h3 className="card-title justify-center">My Reviews</h3>
                        <p>See all reviews you have submitted</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">View Reviews</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="text-4xl mb-2">🤖</div>
                        <h3 className="card-title justify-center">AI Picks</h3>
                        <p>Get personalized resort recommendations</p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">Get Suggestions</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;