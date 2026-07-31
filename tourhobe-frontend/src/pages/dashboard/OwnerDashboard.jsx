import { useState } from "react";
import MyResorts from "./owner/MyResorts";
import OwnerBookings from "./owner/MyBookings";
import AddResort from "./owner/AddResort";

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
                <button
                    className={`tab tab-lg ${activeTab === 'add' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('add')}
                >
                    Add Resort
                </button>
            </div>
            {activeTab === 'resorts' && <MyResorts />}
            {activeTab === 'bookings' && <OwnerBookings />}
            {activeTab === 'add' && <AddResort />}
        </div>
    );
};

export default OwnerDashboard;