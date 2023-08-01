const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer(); // Create a multer instance to handle form-data

app.use(express.json()); // This middleware is needed to parse JSON data in the request body
app.use(express.urlencoded({extended: true})); // This middleware is needed to parse form data in the request body

app.post("/raw", (req, res) => {
    console.log(JSON.stringify(req.body)); // Printing the parsed request body
    res.send("Ok!");
});

app.post("/urlencoded", (req, res) => {
    console.log(req.body); // Printing the parsed urlencoded
    res.send("Ok!");
});

app.post("/form_data", upload.none(), (req, res) => {
    console.log(req.body); // Printing the parsed form data
    res.send("Ok!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
