// server/server.js

const express = require('express');
const redis = require('redis');
const Sequelize  = require('sequelize');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

//routes config path
const routes = require('./routes/routes.js');

//API RPC BITCOIN-CORE JSON RDP
//const rpcMethods = require("./api-bitcoin-core/api");
//const routerapibitcoin = require("./api-bitcoin-core/api")


/* IMPLEMENTATION
//redis configs

const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);

*/


//mongo set config model
//const User = require('./models/mongo/userModel');

//mysql config sequelize model
//const User = require('../models/users');

//mysql config model
const User = require('./models/mysql/userModel');


//dir path env set
require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

//express and set port
const app = express();
const PORT = process.env.PORT || 3000;


/*
//mysql sequelize connect function
const sequelize = new Sequelize('node-acl-sequelize-test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    
  });

  
     sequelize.authenticate().then(function(){
        console.log('Connected Mysql DB to the Database successfully!');
    }).catch(function(err) {
    console.error('Connected Mysql DB to the Database failed!');
  });

*/

//mongoose mongo connect function
mongoose
.connect(process.env.MONGO_SECRET)
.then(() => {
    console.log('Connected Mongo DB to the Database successfully!');
}); 




//cors setting to receive all origins  
//support parsing of application/x-www-form-urlencoded post data

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false })).use(cors()); 

//implement in cors, connect to specifically configured origin domain-feature
//  app.use(Cors({ origin: [APP_ID], credentials: true }));

//cookie session
server.use(cookieParser());

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

            res.locals.loggedInUser = await User.findByPk( userId );
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


//json rpc api bitcoin core
//app.use("/api", rpcMethods);


//response server connect
app.use('/', routes); app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})

