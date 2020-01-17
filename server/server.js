// server/server.js
const express = require('express');
const redis = require('redis');
const Sequelize  = require('sequelize');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

//API RPC BITCOIN-CORE JSON RDP
const rpcMethods = require("./api-bitcoin-core/api");
//const routerapibitcoin = require("./api-bitcoin-core/api")

//redis configs
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);

//mongo config
const User = require('./models/mongo/userModel');
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




//mysql sequelize connect function
const sequelize = new Sequelize('node-acl-sequelize-test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    
  });

  
     sequelize.authenticate().then(function(){
        console.log('Connection Mysql DB successfully!');
    }).catch(function(err) {
    console.error('Connection Mysql DB failed!');
  });



//mongoose mongo connect function
mongoose
.connect(process.env.MONGO_SECRET)
.then(() => {
    console.log('Connected Mongo DB to the Database successfully');
}); 




//cors setting to receive all origins  
//support parsing of application/x-www-form-urlencoded post data

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })).use(cors()); 

//implement in cors, connect to specifically configured origin domain-feature
//  app.use(Cors({ origin: [APP_ID], credentials: true }));

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

//json rpc api bitcoin core
app.use("/api-bitcoin-core", rpcMethods);


//response server connect
app.use('/', routes); app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})

