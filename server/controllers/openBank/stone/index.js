//CIELO GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
//const User = require("../../models/mongo/userModel");
//const Cielo = require("../../models/mongo/cielo/cieloModel");

//ENV KEYS
// var MerchantId = process.env.MERCHANTID;
// var MerchantKey = process.env.MERCHANTKEY;

exports.listBanks = async (req, res, next) => {
  var url = "https://sandbox-api.openbank.stone.com.br/api/v1/institutions";

  var data = {};

  axios
    .get(url, data, {
      headers: {
        "Content-Type": "application/json",
        //"Accept": "application/x-www-form-urlencoded",
      },
    })
    .then((data) => {
      return res.json(data.data);
    })
    .catch((e) => {
      console.log("error", e);
      return res.json(e);
    });
};
