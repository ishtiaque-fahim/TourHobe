import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Processing login...');

    useEffect(() => {
        const handleCallback = async () => {
            try {
                setStatus('Checking Google response...');
                const result = await getRedirectResult(auth);

                if (result?.user) {
                    setStatus('Syncing your account...');
                    await axios.post('https://tourhobe-backend.onrender.com/api/users', {
                        firebaseUID: result.user.uid,
                        name: result.user.displayName || 'Tourist',
                        email: result.user.email,
                        photoURL: result.user.photoURL || ''
                    });
                    setStatus('Login successful! Redirecting...');
                    setTimeout(() => navigate('/dashboard', { replace: true }), 500);
                } else {
                    setStatus('No result found. Redirecting to login...');
                    setTimeout(() => navigate('/login', { replace: true }), 1000);
                }
            } catch (err) {
                setStatus(`Error: ${err.message}`);
                setTimeout(() => navigate('/login', { replace: true }), 2000);
            }
        };
        handleCallback();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-gray-500">{status}</p>
        </div>
    );
};

export default GoogleCallback;