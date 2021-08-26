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
var url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM+&apikey=demo";

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
    const { stock_symbol } = req.body; //REQUEST BODY JSON

    var config = {
        method: "post",
        url: `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`,

        //headers: {'X-Custom-Header': 'foobar'}

        headers: {
            //"Content-Type": "application/json",
            //"MerchantId:": merchantid1,
            //"MerchantKey:": merchantkey1
        }
    };
    //console.log(config);

    axios(config)
        .then(function (response) {
            console.log(response);
            // console.log(response.data);
            // console.log(response.data.cep);
            // console.log(response.data.logradouro);
            // console.log(response.data.complemento);
            // console.log(response.data.bairro);
            // console.log(response.data.localidade);
            // console.log(response.data.uf);
            // console.log(response.data.ddd);

            // const my_user = response.data;
            // setId(my_user);
        })

        .catch(function (error) {
            console.log(error);
        });

    if (stock_symbol == null) {
        return res
            .status(400)
            .json({ Error: "Enter Symbol Stock Company!" });

    }

};


