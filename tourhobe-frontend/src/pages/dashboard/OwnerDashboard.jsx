import { useState } from "react";
import MyResorts from "./owner/MyResorts";
import OwnerBookings from "./owner/MyBookings";

const OwnerDashboard = () => {
    const [activeTab, setActiveTab] = useState('resorts');

    return (
        <div>
            <div className="tabs tabs-bordered mb-6">
                <button
                    className={`tab tab-lg ${activeTab === 'resorts' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('resorts')}
                >
                    My Resorts
                </button>
                <button
                    className={`tab tab-lg ${activeTab === 'bookings' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    Bookings Received
                </button>
            </div>
            {activeTab === 'resorts' && <MyResorts />}
            {activeTab === 'bookings' && <OwnerBookings />}
        </div>
    );
};

export default OwnerDashboard;