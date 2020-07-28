//GETNET GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
const User = require("../../models/mongo/userModel");
const Payment = require("../../models/mongo/paymentModel");

//ENV KEYS 
// const Token = process.env.GETNETTOKENS;

exports.getnetAuth = async (req, res, next) => {
  
  //GETNET URL
  const url_mode = process.env.URLGETNET;
  //var url = "https://api-sandbox.getnet.com.br/auth/oauth/v2/token";

  var url = url_mode+"/auth/oauth/v2/token";

   var data = {
    scope: "oob",
    grant_type: "client_credentials"
   };

  axios
    .post(url, data, {
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ=="
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

  /* try{ */
    
   const { card_number } = req.body;
   

   //const card_number_token = req.params.card_number;

   const newPayment = new Payment({
    
   //card_number: req.body.card_number,
   card_number,


   });
   
   console.log(card_number);

   newPayment.save();
  //  res.json({
  //    newPayment,
  //   //card_number
  //   data

  //  });

  // console.log(newPayment);

  /* } catch(error){
     console.log(error);
    
   }
   */


/* try{  */
  //Getnet URL
  const url_mode = process.env.URLGETNET;
  //var url = "https://api-sandbox.getnet.com.br/v1/tokens/card";

  var url = url_mode+"/v1/tokens/card";

    var data = {

     card_number: card_number
   
   };


  
  //var data = card_number: "$card_number";
  //var data = "card_number"+card_number;

  // var obj = JSON.parse(data);
  // console.log(obj);
  console.log(data);
  console.log(card_number);
  

  axios
    .post(url, data, {
      headers: {
        "Accept": "application/json, text/plain,",
        "Content-Type": "application/json",
        //
        Authorization: "Bearer 910aba58-1424-4571-ad32-3ae2169e64bd"
      }
    })
    .then(data => {
      //console.log("data", data);
      return res.json(data.data);
      //return res.json(newPayment);
    
    })
    .catch(e => {
      console.log("error", e);
      console.log(data);
      //console.log(card_number);
      //console.log(card_number1);
      return res.json(e);
    });
      // } catch(error){
      //   console.log(error);
      // }
     
};



//Payment credit card function
exports.getnetPayment = async (req, res, next) => {
  
  //  const { CardNumber, NumberToken, ExpirationDate, SecurityCode } = req.body
  //  const CardNumber = await Payment.findOne({ where: {CardNumber} });
  

  //GETNET URL
    const url_mode = process.env.URLGETNET;
    //var url = "https://api-sandbox.getnet.com.br/v1/payments/credit";
  
    var url = url_mode+"/v1/payments/credit";
  
  //BODY DATA REQ
   var data = {
    seller_id: "ee166199-8d66-491d-988c-e4deab5bc9f5", //id inique seller account getnet
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
        number_token:
          "96a0308afafe5e1d6a1764429a9b0e2122b579059c4403337840c0cf990742a14327b2c2902f9340e3b591f4578c28c58b0075c0c8e5b9b992921c856139f96f",             //IMPORTANT TOKEN CREDIT CARD-VARIABLE
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
        Authorization: "Bearer 910aba58-1424-4571-ad32-3ae2169e64bd"     //OAUTH TOKEN GETNET 1 HOURS VALID-VARIABLE
        
      }
    })
    .then(data => {
      // console.log("data", data);
      // return res.json(data.data);
      return res.json(data.data.status);
       
       
      
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

authorization
Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ==

URL da API
https://api-sandbox.getnet.com.br/

*/