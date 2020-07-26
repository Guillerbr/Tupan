//GETNET GATEWAY

const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// env keys
//  const Token = process.env.GETNETTOKENS;
//  const Url = process.env.URLGETNET

exports.getnetAuth = async (req, res, next) => {
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body

  //Getnet URL
  var url = "https://api-sandbox.getnet.com.br/auth/oauth/v2/token";

  var data = {
    scope: "oob",
    grant_type: "client_credentials"
  };

  axios
    .post(url, data, {
      headers: {
        Accept: "application/json, text/plain,",
        "Content-Type": "application/json",
        Authorization:
          "Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ==Bearer 34724fc2-3991-422c-8d9d-1b4604d2e20a"
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
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body

  //Getnet URL
  var url = "https://api-sandbox.getnet.com.br/v1/tokens/card";

  var data = {
    card_number: "5155901222280001"
  };

  axios
    .post(url, data, {
      headers: {
        Accept: "application/json, text/plain,",
        "Content-Type": "application/json",
        Authorization: "Bearer 0c91cf62-48ec-4aad-a1f5-80aead42960f"
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



//Payment credit card function
exports.getnetPayment = async (req, res, next) => {
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body

  //Getnet URL
  var url = "https://api-sandbox.getnet.com.br/v1/payments/credit";

  //BODY DATA REQ
  var data = {
    seller_id: "ee166199-8d66-491d-988c-e4deab5bc9f5", //id inique seller account getnet
    amount: "1000",
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
        number_token:
          "b3fad44c36b93ae8a8a7dcf3ac3c5d830271a04bb9e02a59d43b3d1eb11b3c1d29ee94f255ea581c2845ed269e0b43cc3a0491dcd60c53b2423e6b5bb31d89d7",             //IMPORTANT TOKEN CREDIT CARD
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
        Authorization: "Bearer 0c91cf62-48ec-4aad-a1f5-80aead42960f"
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

URL da API
https://api-sandbox.getnet.com.br/

*/
