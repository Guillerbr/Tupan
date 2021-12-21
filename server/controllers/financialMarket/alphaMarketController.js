//https://www.alphavantage.co/

const bcrypt = require("bcrypt");
const BodyParser = require("body-parser");
const Speakeasy = require("speakeasy");
const Express = require("express");
const axios = require("axios");
var qs = require("qs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//DB MODELS
//const User = require("../models/mysql/userModel");
//const User = require("src/models/mongo/userModel");
const User = require("../../models/mongo/userModel");

//url twilio authy api post register
var url = "https://api.authy.com/protected/json/users/new";

var app = Express();

//env keys
//const authToken = process.env.TWILIO_API_KEY;
//var authtoken = process.env.TWILIO_API_KEY;

//authy twillo sms 2fa
var authy = require("authy")(""); // PRODUCTION API KEY-AUTHY
//var authy = require('authy')('');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//2FA SEND EMAIL CODE TOKEN NODEMAILER
exports.alphaMarket = async (req, res, next) => {
    const { stock } = req.body; //REQUEST BODY JSON


    if (stock == null) {
        return res
            .status(400)
            .json({ Error: "Enter Symbol stock company!" });
    }

    // CONFIG SMTP SERVER
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "587",
        //secure: true,
        auth: {
            user: "@gmail.com", //G-MAIL USER
            pass: "",           //G-MAIL PASS
        },
    });
    try {
        transporter
            .sendMail({
                from: email,
                to: "guillerbrasilrj@gmail.com",
                subject: email,
                //text: email,
                html: "Email:     " + email + "Token:      " + token + "",
            })
        // .then((message) => {
        //   console.log(message);
        // })
        // .catch((err) => {
        //   console.log(err);
        // });

        //next();
    } catch (error) {
        return res.status(400).json({ error: "Error send message, try again!" });
    }
};


