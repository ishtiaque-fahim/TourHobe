import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
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
        const response = await axios.post('https://tourhobe-backend.onrender.com/api/users', {
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
    const [redirecting, setRedirecting] = useState(false);

    const register = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        const dbUser = await syncUserToBackend({ ...result.user, displayName: name });
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };

    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const dbUser = await syncUserToBackend(result.user);
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const dbUser = await syncUserToBackend(result.user);
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };
    const loginWithGithub = async () => {
        const result = await signInWithPopup(auth, githubProvider);
        const dbUser = await syncUserToBackend(result.user);
        setUserRole(dbUser?.role || 'tourist');
        return result;
    };

    const logout = async () => {
        setUserRole(null);
        return signOut(auth);
    };

    useEffect(() => {
        setLoading(true);

        getRedirectResult(auth).then(async (result) => {
            if (result?.user) {
                const dbUser = await syncUserToBackend(result.user);
                setUserRole(dbUser?.role || 'tourist');
                setCurrentUser(result.user);
            }
        }).catch((err) => {
            console.error('Redirect result error:', err);
        });

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
        redirecting,
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