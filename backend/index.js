// index.js

const express = require('express');
const cors = require('cors')

const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));
const port = 8001;

// Configure multer to store uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 } // Limit file size to 10MB
});


// Serve HTML form for file upload
app.get('/', (req, res) => {
  res.send('server started at port '+port);
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // The uploaded file can be accessed through req.file
 return res.status(200).send('File uploaded successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
