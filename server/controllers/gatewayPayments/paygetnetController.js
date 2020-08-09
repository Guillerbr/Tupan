//GETNET GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
//import firebase from '../../firebase';

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
const User = require("../../models/mongo/userModel");
const GetNet = require("../../models/mongo/getNet/getNetModel");

//ENV KEYS
// const Token = process.env.GETNETTOKENS;

exports.getnetAuth = async (req, res, next) => {
  //GETNET URL
  const url_mode = process.env.URLGETNET;
  //var url = "https://api-sandbox.getnet.com.br/auth/oauth/v2/token";

  var url = url_mode + "/auth/oauth/v2/token";

  const { scope, grant_type } = req.body;

  var data = {
    // scope: scope,
    // grant_type: grant_type
    
  };

  axios
    .post(url, data, {
      headers: {
        "Accept": "application/json, text/plain",
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

//Token Credit Card -hash card credentials
exports.getnetToken = async (req, res, next) => {
  const url_mode = process.env.URLGETNET;
  const BearerToken = process.env.BEARERTOKEN;

  //var url = "https://api-sandbox.getnet.com.br/v1/tokens/card";
  var url = url_mode + "/v1/tokens/card";

  const { card_number } = req.body;
  
  var data = {
    card_number: card_number
  };

  //console.log(data);
  //console.log(card_number);

  axios
    .post(url, data, {
      headers: {
        Accept: "application/json, text/plain,",
        "Content-Type": "application/json",
        Authorization: BearerToken                   //OAUTH TOKEN GETNET 1 HOURS VALID-VARIABLE
      }
    })
    .then(data => {
      //console.log(data.data);
      //return res.json(data.data);
      //return res.json(data.data.number_token);
      //return res.send(data.number_token);

      const number_token = data.data.number_token;
      const tokenNumber = new GetNet({
        card_number,
        number_token
      });
      tokenNumber.save();
      return res.json(data.data.number_token);
    })
    .catch(e => {
      console.log("error", e);
      return res.json(e);
    });

};

//Payment credit card function
exports.getnetPayment = async (req, res, next) => {
  const { number_token, NumberToken, ExpirationDate, SecurityCode } = req.body;

  //GETNET URL
  const url_mode = process.env.URLGETNET;
  const sellerid = process.env.SELLER_ID;
  const BearerToken = process.env.BEARERTOKEN;

  //endpoint url origin
  var url = url_mode + "/v1/payments/credit";
  //var url = "https://api-sandbox.getnet.com.br/v1/payments/credit";

  //BODY DATA REQ
  var data = {
    //seller_id: "ee166199-8d66-491d-988c-e4deab5bc9f5", //id inique seller account getnet
    //seller_id: sellerid,                           
    amount: "10000",
    order: {
      order_id: "12345"
    },
    customer: {
      customer_id: "12345",
      billing_address: {}
    },
    device: {},
    shippings: [
      {
        address: {}
      }
    ],
    credit: {
      delayed: false,
      save_card_data: false,
      transaction_type: "FULL",
      number_installments: 1,
      card: {
        number_token: number_token,               //IMPORTANT TOKEN CREDIT CARD-VARIABLE
        cardholder_name: "JOAO DA SILVA",
        expiration_month: "12",
        expiration_year: "21"
      }
    }
  };

  axios
    .post(url, data, {
      headers: {
        Accept: "application/json, text/plain,",
        "Content-Type": "application/json",
        Authorization: BearerToken                 //OAUTH TOKEN GETNET 1 HOURS VALID-VARIABLE
      }
    })
    .then(data => {
      // console.log("data", data);
      // return res.json(data.data);
      // res.json(data.data.status);

      const status_payment = data.data.status;
      const statusPayment = new GetNet({

        status_payment,
        number_token,

      });
      statusPayment.save();
      //return res.json(data.data.status);
      return res.json("Success: Payment Authorized!");
      

    })
    .catch(e => {
      console.log("error", e);
      //return res.json(e);
      return res.json("Error: Not Authorized!");
      
    });
};

















/*

-SANDBOX TEST ACCOUNT

https://developers.getnet.com.br/
https://developers.getnet.com.br/api#section/Como-comecar/Criando-a-sua-conta-no-Sandbox
https://github.com/brunopazz/GetnetSDK


access_token
47f5370d-d653-4aa4-b7b8-cfb622bc40e1

seller_id
ee166199-8d66-491d-988c-e4deab5bc9f5
 
client_id
aa8f2c4c-a8ea-4231-842a-e1b852ec6b13

client_secret
80e307d8-cf8b-4554-93c9-3fc7f004f5da

authorization
Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ==

URL da API
https://api-sandbox.getnet.com.br/

*/
