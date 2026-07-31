import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    // Sync to backend
                    await axios.post('https://tourhobe-backend.onrender.com/api/users', {
                        firebaseUID: result.user.uid,
                        name: result.user.displayName || 'Tourist',
                        email: result.user.email,
                        photoURL: result.user.photoURL || ''
                    });
                    navigate('/dashboard', { replace: true });
                } else {
                    navigate('/login', { replace: true });
                }
            } catch (error) {
                console.error('Auth callback error:', error);
                navigate('/login', { replace: true });
            }
        };
        handleRedirect();
    }, [navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="ml-4 text-gray-500">Completing login...</p>
        </div>
    );
};

export default AuthCallback;