import {getFirebaseApp} from './server.mjs'
import {getStorage, ref, getDownloadURL, uploadBytesResumable, uploadBytes} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"
// const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");
// const { memoryStorage } = require("multer");
// const express = require("express");
// const {Router} = express;

// const router = express.Router();
const storage = getStorage(getFirebaseApp(), 'gs://hobbiednest.appspot.com');

// const upload = multer({storage:memoryStorage()});
// router.post("/", upload.single("filename"), async(req,res) =>{
//     try{
//         const dateTime = giveCurrentDateTime();
        
//         // If you upload an image with the same name it will replace it.
//         const storageRef = ref(storgae, 'files/${req.file.originalname + "      " + dateTime}');

//         const metadata = {
//             contentType: req.file.mimetype,
//         };

//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

//         const downloadURL = await getDownloadURL(snapshot.url);
//         console.log('File successfully uploaded');

//         return res.send({
//             message: 'file uploaded to firebase storage',
//             name: req.file.originalname,
//             type: req.file.mimetype,
//             downloadURL: downloadURL,
//         })
//     } catch (error){
//         return res.status(400).send(error.message)
//     }
// })

// const giveCurrentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     const dateTime = date + ' ' + time;
//     return dateTime;
// }

const uploadFile = document.getElementById('upload');
const fileUpl = document.getElementById('file-input');

uploadFile.addEventListener('click', (event)=>{
    const file = fileUpl.files[0];
    const storageRef = ref(storage, 'images/'+file.name);
    uploadBytes(storageRef, file).then((snapshot) => {

        console.log('Uploaded a blob or file!');
    });
})

// export default router;