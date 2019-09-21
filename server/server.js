// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');


require("dotenv").config({
    path: path.join(__dirname, "../.env")
});


const app = express();


const PORT = process.env.PORT || 3000;


mongoose
    .connect('mongodb://localhost:27017/rbac')
    .then(() => {
        console.log('Connected to the Database successfully');
    });

app.use(bodyParser.urlencoded({ extended: true }));

