import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDH19RJUeeFxa3Y_j2chSkcktAhVicBJcc",
    authDomain: "tourhobe-356a5.firebaseapp.com",
    projectId: "tourhobe-356a5",
    storageBucket: "tourhobe-356a5.firebasestorage.app",
    messagingSenderId: "316109253708",
    appId: "1:316109253708:web:17291e954adf9bdac058e9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const githubProvider = new GithubAuthProvider();