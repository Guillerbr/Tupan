//PAG SEGURO GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
//import firebase from '../../firebase';

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
const User = require("../../models/mongo/userModel");
const Payment = require("../../models/mongo/paymentModel");

//ENV KEYS
// const Token = process.env.GETNETTOKENS;

exports.createSession = async (req, res, next) => {
  // email= 'guillerbrasilrj@gmail.com';
  //var token= EAD7FC0724EF424294BE1A3C3D62FEF2;

  var config = {
    method: "post",
    url:
      "https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=guillerbrasilrj@gmail.com&token=EAD7FC0724EF424294BE1A3C3D62FEF2",
    headers: {}
  };

  axios(config)
    .then(function(response) {
      //console.log(JSON.stringify(response.data));
      return res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};

exports.pagsegTokenCard = async (req, res, next) => {
  //PAG SEGURO URL
  const url_mode = process.env.URLPAGSEG;
  //var url = "https://df.uol.com.br/v2/cards";

  var url = url_mode + "/v2/cards";

  var data = {
    scope: "oob",
    grant_type: "client_credentials"
  };

  axios
    .post(url, data, {
      headers: {
        //"Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ=="
      }
    })
    .then(data => {
      //console.log("data", data);
      return res.json(data.data);
    })
    .catch(e => {
      console.log("error", e);
      return res.json(e);
    });
};
