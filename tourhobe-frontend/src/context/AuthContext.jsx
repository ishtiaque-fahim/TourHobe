import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const syncUserToBackend = async (user) => {
    try {
        await axios.post('http://localhost:5000/api/users', {
            firebaseUID: user.uid,
            name: user.displayName || 'Tourist',
            email: user.email,
            photoURL: user.photoURL || ''
        });
    } catch (error) {
        console.error('User sync failed:', error.message);
    }
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register with email and password
    const register = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await syncUserToBackend({ ...result.user, displayName: name });
        return result;
    };

    // Login with email and password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Login with Google
    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        await syncUserToBackend(result.user);
        return result;
    };

    // Login with GitHub
    const loginWithGithub = async () => {
        const result = await signInWithPopup(auth, githubProvider);
        await syncUserToBackend(result.user);
        return result;
    };

    // Logout
    const logout = () => signOut(auth);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loading,
        register,
        login,
        loginWithGoogle,
        loginWithGithub,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};