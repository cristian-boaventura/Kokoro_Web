// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAlZJzb3TzHigO45l589hbgMglPYiVFGFo',
  authDomain: 'kokoro-web-d14c3.firebaseapp.com',
  projectId: 'kokoro-web-d14c3',
  storageBucket: 'kokoro-web-d14c3.appspot.com',
  messagingSenderId: '138954647249',
  appId: '1:138954647249:web:be4e7b21a29f9910d047f0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const signinWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem('token', user.uid);
  } catch (error) {
    throw error;
  }
};

export const handleGoogleCredential = async (response: any) => {
  try {
    // Build Firebase credential with the Google ID token.
    const idToken = await response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    await signInWithCredential(auth, credential);
    localStorage.setItem('token', response.credential);
  } catch (error) {
    throw error;
  }
};

export const signout = async () => {
  try {
    await signOut(auth);
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
  } catch (error) {
    throw error;
  }
};

const db = getFirestore(app);

export const setStore = async (reason: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not found');
    }
    const store = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      reason,
    };
    await addDoc(collection(db, 'users'), store);
  } catch (error) {
    throw error;
  }
};
