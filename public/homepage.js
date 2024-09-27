import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"
import {firebaseConfig} from "./loadenv.js"

const app=initializeApp(firebaseConfig);

const auth=getAuth();
const db=getFirestore();

onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef=doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                console.log(userData);
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;
            }else{
                console.log("no document found matching id");
            }
        })
        .catch((error) =>{
            console.error("Error getting document", error);
        })
    }else{
        console.log("User Id not found in local storage");
    }
})

const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='test.html';
    })
    .catch((error)=>{
        console.error('Error Signing Out: ', error);
    })
})