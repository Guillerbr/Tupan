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


//cors setting to receive all origins  
//support parsing of application/x-www-form-urlencoded post data

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })).use(cors()); 

//implement in cors, connect to specifically configured origin domain-feature




//define default type headers 
//x-access-token use token
//future possibility to implement authorization or bearer token
//more efficient standards
app.use(async (req, res, next) => {

    try {

        if (req.headers["x-access-token"]) {

            const accessToken = req.headers["x-access-token"];

            const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);


            // Check if token has expired
            if (exp < Date.now().valueOf() / 1000) {
                return res.status(401).send({ error: "JWT token has expired, please login to obtain a new one" });
            }

            res.locals.loggedInUser = await User.findById(userId);
            next();

        }
        else {
            next();
        }
    }
    catch (error) {
        // next(error)
        return res.status(401).json({ error: 'Acess Token invalid go to login' });

    }


});


//reposnse server connect
app.use('/', routes); app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})

