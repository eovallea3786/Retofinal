// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDCSBkA6dFI2iFvSluZ58KQFQF7eYq369U",
    authDomain: "fazt-crud-fb-f8297.firebaseapp.com",
    projectId: "fazt-crud-fb-f8297",
    storageBucket: "fazt-crud-fb-f8297.appspot.com",
    messagingSenderId: "54540806834",
    appId: "1:54540806834:web:e902be168e81b4955d77ab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();




/**
 * Save a New Class in Firestore
 * @param {string} Asignatura_nombre the title of the Task
 * @param {string} Asignatura_Descripción the description of the Task
 */
export const saveClase = (Asignatura_nombre, Asignatura_Descripción) =>
    addDoc(collection(db, "Clase"), { Asignatura_nombre, Asignatura_Descripción });

export const onGetClases = (callback) =>
    onSnapshot(collection(db, "Clase"), callback);

/**
 * export const saveTask = (title, description) =>
    addDoc(collection(db, "tasks"), { title, description });
    
    export const onGetTasks = (callback) =>
    onSnapshot(collection(db, "tasks"), callback);
 */




/**
 *
 * @param {string} id Task ID
 */


export const deleteClase = (id) => deleteDoc(doc(db, "Clase", id));

export const getClase = (id) => getDoc(doc(db, "Clase", id));

export const updateClase = (id, newFields) =>
    updateDoc(doc(db, "Clase", id), newFields);

export const getClases = () => getDocs(collection(db, "Clase"));