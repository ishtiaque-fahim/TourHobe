import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle, loginWithGithub } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
        setLoading(false);
    };

    const handleGoogle = async () => {
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            console.error('Google login error:', err.code, err.message);
            setError(`Google login failed: ${err.code} - ${err.message}`);
        }
    };

    const handleGithub = async () => {
        try {
            await loginWithGithub();
            navigate('/dashboard');
        } catch (err) {
            setError('GitHub login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center text-primary mb-2">
                        Welcome Back 👋
                    </h2>
                    <p className="text-center text-sm mb-4">Login to your TourHobe account</p>

                    {/* Error Alert */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-2"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Social Login */}
                    <div className="flex flex-col gap-3">
                        <button onClick={handleGoogle} className="btn btn-outline w-full gap-2">
                            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
                            Continue with Google
                        </button>
                        <button onClick={handleGithub} className="btn btn-outline w-full gap-2">
                            <img src="https://github.com/favicon.ico" className="w-5 h-5" />
                            Continue with GitHub
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="text-center mt-4 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary font-semibold">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;