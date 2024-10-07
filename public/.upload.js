// import {getStorage, ref, getDownloadURL, uploadBytesResumable} from "firebase/storage"
// import {multer} from "./modules/multer/index";
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");
const { memoryStorage } = require("multer");
const express = require("express");
// const {Router} = express;

const router = express.Router();

const storage = getStorage();

const upload = multer({storage:memoryStorage()});

router.post("/", uplaod.single("filename"), async(req,res) =>{
    try{
        const dateTime = giveCurrentDateTime();
        
        // If you upload an image with the same name it will replace it.
        const storageRef = ref(storgae, 'files/${req.file.originalname + "      " + dateTime}');

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.url);
        console.log('File successfully uploaded');

        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL,
        })
    } catch (error){
        return res.status(400).send(error.message)
    }
})
