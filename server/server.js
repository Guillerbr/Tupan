// server/server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
//const Sequelize = require("../config/config.json");
const Sequelize = require("sequelize");
//const { Sequelize, INTEGER, STRING, DOUBLE } = require("sequelize")

//const cookieParser = require('cookie-parser');
//const redis = require('redis');

//ROUTES
const routes = require("./routes/routes.js");

//REDIS
// const REDIS_PORT = process.env.REDIS_PORT;
// const client = redis.createClient(REDIS_PORT);

//MODELS DB
//const User = require('./models/mongo/userModel');
const User = require("../models/users");

//ENV GLOBAL
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

//EXPRESS AND PORT
const app = express();
const PORT = process.env.PORT || 3000;

//ORM SQL SEQUELIZE CONNECTION
const sequelize = new Sequelize("Tupã", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Connected Mysql DB to the Database successfully!");
  })
  .catch(function (err) {
    console.error("Connected Mysql DB to the Database failed!");
  });



//ORM MONGOOSE-MONGO DB CONNECTION
mongoose.connect(process.env.MONGO_SECRET).then(() => {
  console.log("Connected Mongo DB to the Database successfully!");
});

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })).use(cors());

//FEATURE CORS UNIQUE IP ACCESS
//  app.use(Cors({ origin: [APP_ID], credentials: true }));

//FEATURE COOKIE PARSER
//app.use(cookieParser());

//ACL RBAC TOKEN JWT-BEARER AUTHORIZATION IMPLEMENT FEATURE
app.use(async (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      //const accessToken = req.cookies.headers["x-access-token"];
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );

      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).send({
          error: "JWT token has expired,please login to obtain a new one",
        });
      }

      res.locals.loggedInUser = await User.findByPk(userId);
      next();
    } else {
      next();
    }
  } catch (error) {
    //next(error)
    //console.log(error);
    return res.status(401).json({ error: "Acess Token invalid go to login" });
  }
});

//RESPONSE SERVER
app.use("/", routes);
app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
