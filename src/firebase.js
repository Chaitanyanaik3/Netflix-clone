import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyDOUgeOxEFc6l0ooIPuJBlY-qhVN5XlQwU",
    authDomain: "netflix-clone-e83e2.firebaseapp.com",
    projectId: "netflix-clone-e83e2",
    storageBucket: "netflix-clone-e83e2.firebasestorage.app",
    messagingSenderId: "475789791597",
    appId: "1:475789791597:web:2edacc3842f57c53c74a64"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        // await addDoc(collection(db,"user"),{
        //     uid: user.uid,
        //     name,
        //     authProvider: "local",
        //     email,
        // });
        await setDoc(doc(db, "user", user.uid), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }
    catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const logout = () => {
    signOut(auth);
}
export { auth, db, login, signup, logout };