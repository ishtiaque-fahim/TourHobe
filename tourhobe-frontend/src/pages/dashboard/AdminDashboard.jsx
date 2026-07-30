import { useState } from "react";
import ManageUsers from "./admin/ManageUsers";
import ManageResorts from "./admin/ManageResorts";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div>
            {/* Tabs */}
            <div className="tabs tabs-bordered mb-6">
                <button
                    className={`tab tab-lg ${activeTab === 'users' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Manage Users
                </button>
                <button
                    className={`tab tab-lg ${activeTab === 'resorts' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('resorts')}
                >
                    Manage Resorts
                </button>
            </div>

            {activeTab === 'users' && <ManageUsers />}
            {activeTab === 'resorts' && <ManageResorts />}
        </div>
    );
};

export default AdminDashboard;