const multer = require("multer");
const path =require("path");

//CONFIGURATION FOR MULTER 
const storage = multer.diskStorage({
    destination: function (req, file1, cb){
        cb(null, "PDFs/");
    },
    filename1: function (req, file1, cb) {
        cb(null, Date.now() + path.extname(file1.originalname));
    },
});

const uploadPDF = multer({ storage: storage});
module.exports = uploadPDF;