// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/routes.js');

//import cors
const cors = require('cors');


//dir path env set
require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

//express and set port
const app = express();
const PORT = process.env.PORT || 3000;

//mongoose connect function
mongoose
    .connect(process.env.MONGO_SECRET)
    .then(() => {
        console.log('Connected to the Database successfully');
    });

//set cors and bodyparser    
app.use(bodyParser.urlencoded({ extended: true })).use(cors());


//define default type headers 
app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(200).send({ error: "JWT token has expired, please login to obtain a new one" });
        }
        res.locals.loggedInUser = await User.findById(userId); next();
    } else {
        next();
        //return res.status(200).send({ error: "Please login to obtain a new one" });

    }
});

//reposnse server connect
app.use('/', routes); app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})

