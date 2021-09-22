const express = require('express');
const router = express.Router();
const checkToken= require('../middlware/auth')
const formidable = require('formidable');
// const fs = require('fs');

const Imgages=require('../models/Images')

router.post('/upload_images', (request, response, next) => {
    let formidable = require('formidable');
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = './uploads';
    form.keepExtensions = true; // Lay ca duoi file anh
    form.maxFieldsSize = 10 * 1024 * 1024; //10 MB
    form.multiples = true; //Upload nhieu anh
    form.parse(request, (err, fields, files) => {
        if (err) {
            response.json({
                result: "failed",
                data: {},
                messege: `Cannot upload images.Error is : ${err}`
            });
        }
        
        const arrayOfFiles = [];
        if(files[""] instanceof Array) {
            arrayOfFiles = files[""];
        } else {
            arrayOfFiles.push(files[""]);
        }
        
        if (arrayOfFiles.length > 0) {
            var fileNames = [];
            arrayOfFiles.forEach((eachFile)=> {
                // fileNames.push(eachFile.path)
                fileNames.push(eachFile.path.split('/')[1]);
            });
            response.json({
                result: "ok",
                data: fileNames,
                numberOfImages: fileNames.length,
                messege: "Upload images successfully"
            });
        } else {
            response.json({
                result: "failed",
                data: {},
                numberOfImages: 0,
                messege: "No images to upload !"
            });
        }
    });
});
module.exports=router