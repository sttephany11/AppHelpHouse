import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBpfzZ2RAh1vlDRAYGc_naOeQHh-nvqoG4",
  authDomain: "insertimage-74586.firebaseapp.com",
  projectId: "insertimage-74586",
  storageBucket: "insertimage-74586.appspot.com",
  messagingSenderId: "277707986199",
  appId: "1:277707986199:web:3a502d8ed921509f2e1352",
  measurementId: "G-CQJ91S888G"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
