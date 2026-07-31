import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, loginWithGoogle, loginWithGithub } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }
        setLoading(true);
        try {
            await register(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Email may already be in use.');
        }
        setLoading(false);
    };

    const handleGoogle = async () => {
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Google login failed. Please try again.');
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
                    <div className="flex justify-center mb-2">
                        <img src="/tourhobe.png" alt="TourHobe" className="h-16 w-auto" />
                    </div>
                    <h2 className="text-3xl font-bold text-center text-primary mb-2">
                        Join TourHobe
                    </h2>
                    <p className="text-center text-sm mb-4">Create your free account</p>

                    {/* Error Alert */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Register Form */}
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your full name"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                                placeholder="Min. 6 characters"
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
                            {loading ? <span className="loading loading-spinner"></span> : 'Create Account'}
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

                    {/* Login Link */}
                    <p className="text-center mt-4 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-semibold">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;