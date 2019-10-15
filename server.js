const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));

// diskStorage Setup
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {

        cb(null, Date.now() + file.originalname)
    }
});
// add Setup Storage
let upload = multer({storage: storage});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/user.html');
});

app.post('/upload-file', upload.single('myFile'), function(req, res){
    const file = req.file;
    if(file) {
        res.json({
            status: 200,
            isSavedFile: true,
            info: file
        });
    } else {
        res.json({
            status: 404,
            isSavedFile: false,
            info: 'Not Found'
        });
    }
});

app.listen(3000, () => console.log('app running in port 3000'));