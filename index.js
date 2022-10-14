const express = require('express'); // import express
const { connectDb } = require('./services/db'); // import db connect function
const datService = require('./services/dataService')
const dotenv = require('dotenv'); // import dotenv loads env variable to process.env file

const app = express(); // initializing the application
app.use(express.json()); // express middleware to parse JSON data
app.use(express.urlencoded({ extended: false })); // express middleware to parse html POST form
dotenv.config(); // configuring dotenv to index.js
connectDb(); // db connect function call

// GET method call
app.get('/', (req, res) => {
    res.json({ statusCode: 200, status: 'Ok', message: 'GET Method Called' })
});


// POST method call
app.post('/create-method', (req, res) => {
    datService
        .postMethod(req.body.fullName, req.body.email, req.body.phone, req.body.userType, req.body.activeStatus)
        .then((result) => {
            res.status(result.statusCode).json(result);
        });
});

app.post("/read-method", (req, res) => {
  datService.getMethod(req.body.fullName).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

app.post("/update-method", (req, res) => {
  datService
    .updateMethod(req.body.email, req.body.emailNew)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

app.post("/delete-method", (req, res) => {
  datService.deleteMethod(req.body.fullName, req.body.email).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// listening to port
app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`)
});