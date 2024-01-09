// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
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
const auth = getAuth(app);

export const signinWithEmail = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleCredentialResponse = (response: any) => {
  // Build Firebase credential with the Google ID token.
  const idToken = response.credential;
  const credential = GoogleAuthProvider.credential(idToken);
  console.log(response, credential);

  signInWithCredential(auth, credential).catch((error: any) => {
    console.error(error);
  });
};
