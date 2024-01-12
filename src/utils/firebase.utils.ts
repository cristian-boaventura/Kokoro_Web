// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from 'firebase/auth';

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
    const user = await userCredential.user;
    await localStorage.setItem('token', user.uid);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

export const handleCredentialResponse = async (response: any) => {
  try {
    // Build Firebase credential with the Google ID token.
    const idToken = await response.credential;
    const credential = await GoogleAuthProvider.credential(idToken);

    await signInWithCredential(auth, credential);
    await localStorage.setItem('token', response.credential);
  } catch (error: any) {
    console.error(error);
  }
};

export const signout = async () => {
  try {
    await signOut(auth);
    const token = await localStorage.getItem('token');
    if (token) {
      await localStorage.removeItem('token');
    }
  } catch (error) {
    console.log(error);
  }
};
