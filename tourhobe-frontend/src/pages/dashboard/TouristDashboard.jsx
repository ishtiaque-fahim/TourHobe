import { useState } from "react";
import Recommendations from "./Recommendations";
import MyBookings from "./tourist/MyBookings";
import MyReviews from "./tourist/MyReviews";

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
                    className={`tab tab-lg ${activeTab === 'bookings' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    🏨 My Bookings
                </button>
                <button
                    className={`tab tab-lg ${activeTab === 'reviews' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    ⭐ My Reviews
                </button>
                <button
                    className={`tab tab-lg ${activeTab === 'recommendations' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('recommendations')}
                >
                    🤖 AI Picks
                </button>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                        onClick={() => setActiveTab('bookings')}>
                        <div className="card-body text-center">
                            <div className="text-4xl mb-2">🏨</div>
                            <h3 className="card-title justify-center">My Bookings</h3>
                            <p>View and manage your resort bookings</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                        onClick={() => setActiveTab('reviews')}>
                        <div className="card-body text-center">
                            <div className="text-4xl mb-2">⭐</div>
                            <h3 className="card-title justify-center">My Reviews</h3>
                            <p>See all reviews you have submitted</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                        onClick={() => setActiveTab('recommendations')}>
                        <div className="card-body text-center">
                            <div className="text-4xl mb-2">🤖</div>
                            <h3 className="card-title justify-center">AI Picks</h3>
                            <p>Get personalized resort recommendations</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'bookings' && <MyBookings />}
            {activeTab === 'reviews' && <MyReviews />}
            {activeTab === 'recommendations' && <Recommendations />}
        </div>
    );
};

export default TouristDashboard;