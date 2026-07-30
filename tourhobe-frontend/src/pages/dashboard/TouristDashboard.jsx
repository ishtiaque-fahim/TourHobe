import { useState } from "react";
import Recommendations from "./Recommendations";

const TouristDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div>
            {/* Tabs */}
            <div className="tabs tabs-bordered mb-6">
                <button
                    className={`tab tab-lg ${activeTab === 'overview' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`tab tab-lg ${activeTab === 'recommendations' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('recommendations')}
                >
                    🤖 AI Picks
                </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
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
                    <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                        onClick={() => setActiveTab('recommendations')}>
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
            )}

            {/* AI Recommendations Tab */}
            {activeTab === 'recommendations' && <Recommendations />}
        </div>
    );
};

export default TouristDashboard;