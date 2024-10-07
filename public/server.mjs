// Import the functions you need from the SDKs you need
// online
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
import {firebaseConfig} from "./loadenv.js"
// local
// import { initializeApp } from "firebase/app";
// import { getFirestore, doc, setDoc} from "firebase/firestore";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log("hi");
// Your web app's Firebase configuration

// const {
//   APIKEY,
//   AUTH,
//   PROJECTID,
//   STORAGEBUCKET,
//   MESSAGING,
//   APPID,
// } = process.env

// const firebaseConfig = {
//   apiKey: APIKEY,
//   authDomain: AUTH,
//   projectId: PROJECTID,
//   storageBucket: STORAGEBUCKET,
//   messagingSenderId: MESSAGING,
//   appId: APPID
// };

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

// Edits the html div specified by the divId paramter, it updates the text to the message, then it disappears in 5 seconds.
function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
    messageDiv.style.opacity=0;
  }, 5000);
}
const signUp = document.getElementById('submitSignUp');

// When SignUp button is clicked it will get all the text from the input fields.
// It will then check to see if it's successful, then it will create a dictionary with the data to push it to the database.
// It then calls showMessage to tell the user signup was successful. 
signUp.addEventListener('click', (event)=>{
  event.preventDefault();
  const email=document.getElementById('rEmail').value;
  const password=document.getElementById('rPassword').value;
  const firstName=document.getElementById('fName').value;
  const lastName=document.getElementById('lName').value;

  const auth=getAuth(app);
  const db=getFirestore(app);

  // If the user authentication is successful, the code in the 'then' keyword will run.
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    const user=userCredential.user;
    const userData={
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    showMessage('Account Created Succesfull', 'signUpMessage');
    const docRef=doc(db, "users", user.uid);
    setDoc(docRef, userData)
    // .then(()=>{
    //   window.location.href="index.html";
    // })
    .catch(error("error writing document", error));
  })
  .catch((error)=>{
    // If there was a problem authenticating an account, 
    const errorCode=error.code;
    // console.log(error)
    if(errorCode=='auth/email-already-in-use'){
      showMessage('Email Already In Use', 'signUpMessage');
    }else if(typeof errorCode !== 'undefined'){
      showMessage('unable to create User', 'signUpMessage');
    }
  })
})

const signIn=document.getElementById('submitSignIn');

signIn.addEventListener('click', (event)=>{
  event.preventDefault();
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;
  const auth=getAuth();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    showMessage('login is successful', 'signInMessage');
    const user=userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href='index.html';
  })
  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode==='auth/invalid-credential'){
      showMessage('Incorrect Email or Password', 'signInMessage');
    }else{
      showMessage('Account does not exist', 'signInMessage');
    }
  })
})

// TODO: Post creation with image uploading. 

// module.exports = {initializeFirebaseApp}
// module.exports = {
//   initializeFirebaseApp,
//   getFirebaseApp,
//   uploadProcessedData,
// }
