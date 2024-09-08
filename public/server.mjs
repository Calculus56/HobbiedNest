// Import the functions you need from the SDKs you need
// online
// import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
// local
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log("hi");
// Your web app's Firebase configuration

const {
  APIKEY,
  AUTH,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGING,
  APPID,
} = process.env

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTH,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGING,
  appId: APPID
};

// console.log(firebaseConfig);

let app;
let firestoreDb;
// Every value is a key value pair

// Initialize Firebase
export const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);

    return app;
  } catch (error) {
    console.log(error);
    // errorHandeler(error, "firebase-initializeFirebaseApp")
  }
}

export const uploadProcessedData = async () => {
  const dataToUpload = {
    // Can have any key value pair with any type.
    key1: "test",
    key2: 123,
  };
  try {
    // parameters are: connection to database, collection type, unqiue id for the document
    const document = doc(firestoreDb, "test", "unique-id");
    console.log(document);
    let dataUpdated = await setDoc(document, dataToUpload);
    return dataUpdated;
  } catch (error) {
    // errorHandeler(error, "firebase-uploadProcessedData")
    console.log(error);
  }
}
export const getFirebaseApp = () => app;

// module.exports = {initializeFirebaseApp}
// module.exports = {
//   initializeFirebaseApp,
//   getFirebaseApp,
//   uploadProcessedData,
// }
