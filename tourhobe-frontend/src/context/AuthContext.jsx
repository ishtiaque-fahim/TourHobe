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
        const response = await axios.post('http://localhost:5000/api/users', {
            firebaseUID: user.uid,
            name: user.displayName || 'Tourist',
            email: user.email,
            photoURL: user.photoURL || ''
        });
        return response.data.user;
    } catch (error) {
        console.error('User sync failed:', error.message);
    }
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register with email and password
    const register = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        const dbUser = await syncUserToBackend({ ...result.user, displayName: name });
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };

    // Login with email and password
    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const dbUser = await syncUserToBackend(result.user);
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };

    // Login with Google
    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const dbUser = await syncUserToBackend(result.user);
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };

    // Login with GitHub
    const loginWithGithub = async () => {
        const result = await signInWithPopup(auth, githubProvider);
        const dbUser = await syncUserToBackend(result.user);
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };

    // Logout
    const logout = async () => {
        setUserRole(null);
        return signOut(auth);
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                const dbUser = await syncUserToBackend(user);
                setUserRole(dbUser?.role || 'tourist');
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
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