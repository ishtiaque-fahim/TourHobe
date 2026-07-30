import { useState } from "react";
import MyResorts from "./owner/MyResorts";

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
            </div>
            {activeTab === 'resorts' && <MyResorts />}
        </div>
    );
};

export default OwnerDashboard;