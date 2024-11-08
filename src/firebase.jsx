import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        console.log('User is signed in');
    } else {
        console.log('User is signed out');
    }
});