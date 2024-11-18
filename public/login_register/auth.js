import {getFirebaseApp} from './server.mjs'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"


// Edits the html div specified by the divId paramter, it updates the text to the message, then it disappears in 5 seconds.
function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
      messageDiv.style.opacity=0;
      messageDiv.style.display="none";
    }, 5000);
  }
  const signUp = document.getElementById('submitSignUp');
  
  // When SignUp button is clicked it will get all the text from the input fields.
  // It will then check to see if it's successful, then it will create a dictionary with the data to push it to the database.
  // It then calls showMessage to tell the user signup was successful. 
  if(signUp!=null){
    signUp.addEventListener('click', (event)=>{
      event.preventDefault();
      const email=document.getElementById('email').value;
      const password=document.getElementById('password').value;
      const con_password=document.getElementById('confirm-password').value;
      const phone=document.getElementById('phone').value;
      const username=document.getElementById('username').value;
      const fullname=document.getElementById('fullname').value;
      // const lastName=document.getElementById('lName').value;
    
      const auth=getAuth(getFirebaseApp());
      const db=getFirestore(getFirebaseApp());
    
      // If the user authentication is successful, the code in the 'then' keyword will run.
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        console.log("Worked");
        
        const user=userCredential.user;
        const userData={
          email: email,
          username: username,
          fullname: fullname,
          phone: phone,
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
        }else if(password!=con_password){
          showMessage('Password is not the same', 'signUpMessage');
        }else if(typeof errorCode !== 'undefined'){
          showMessage('unable to create User', 'signUpMessage');
        }
      })
    })
  }
  
  const signIn=document.getElementById('submitSignIn');
  if(signIn!=null){
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
        window.location.href='../homepage/homepage.html';
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
  }