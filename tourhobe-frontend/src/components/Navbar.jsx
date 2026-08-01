import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-4">
            {/* Logo */}
            <div className="flex-1">
                <Link to="/">
                    <img src="/tourhobe.png" alt="TourHobe" className="h-14" />
                </Link>
            </div>

            {/* Nav Links */}
            <div className="flex-none gap-2">
                <ul className="menu menu-horizontal px-1 hidden md:flex">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/resorts">Resorts</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                {currentUser ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName}&background=random`}
                                    alt="avatar"
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            <li className="menu-title">{currentUser.displayName}</li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;