import { useAuth } from "../context/AuthContext";
import TouristDashboard from "./dashboard/TouristDashboard";
import OwnerDashboard from "./dashboard/OwnerDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

const Dashboard = () => {
    const { currentUser, userRole } = useAuth();

    const renderDashboard = () => {
        if (userRole === 'admin') return <AdminDashboard />;
        if (userRole === 'owner') return <OwnerDashboard />;
        return <TouristDashboard />;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-primary mb-2">
                Welcome, {currentUser?.displayName}! 👋
            </h1>
            <p className="text-gray-500 mb-2">Email: {currentUser?.email}</p>
            <div className="badge badge-primary mb-8">
                Role: {userRole || 'tourist'}
            </div>
            {renderDashboard()}
        </div>
    );
};

export default Dashboard;