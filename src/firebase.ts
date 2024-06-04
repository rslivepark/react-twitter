import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBuOcZ30bb_ugNtrVjAxZSUVPurNt1nLJg',
  authDomain: 'switter-clone-b1e60.firebaseapp.com',
  projectId: 'switter-clone-b1e60',
  storageBucket: 'switter-clone-b1e60.appspot.com',
  messagingSenderId: '177680483549',
  appId: '1:177680483549:web:9381f286a1779ac2730734',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
