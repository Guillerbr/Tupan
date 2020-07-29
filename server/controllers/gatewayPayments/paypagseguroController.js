//PAG SEGURO GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
var qs = require('qs');
//import firebase from '../../firebase';

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
const User = require("../../models/mongo/userModel");
const Payment = require("../../models/mongo/paymentModel");

//ENV KEYS
// const Token = process.env.GETNETTOKENS;

exports.pagsegSession = async (req, res, next) => {
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

    const { sessionId, amount, cardNumber, cardBrand, cardCvv, cardExpirationMonth, cardExpirationYear } = req.body;


    var data = qs.stringify({
       'sessionId': '19fd386566e44e7a99bea3dced23b9e4',
       'amount': '11',
       'cardNumber': cardNumber,
       'cardBrand': 'Visa',
       'cardCvv': cardCvv,
       'cardExpirationMonth': cardExpirationMonth,
       'cardExpirationYear': cardExpirationYear 
       });
       var config = {
         method: 'post',
         url: 'https://df.uol.com.br/v2/cards\n',
         headers: { 
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         data : data
       };
       
       axios(config)
       .then(function (response) {
         console.log(JSON.stringify(response.data));
         return res.json(response.data);
       })
       .catch(function (error) {
         console.log(error);
       });
    }   


       exports.pagsegPayment = async (req, res, next) => {

        var data = qs.stringify({
           'paymentMode': 'default',
           'paymentMethod': 'creditCard',
           'receiverEmail': 'compradornovo@sandbox.pagseguro.com.br',
           'currency': 'BRL',
           'extraAmount': '1.00',
           'itemId1': '0001',
           'itemDescription1': 'NotebookPrata',
           'itemAmount1': '24300.00',
           'itemQuantity1': '1',
           'notificationURL': 'https://sualoja.com.br/notifica.html',
           'reference': 'REF1234',
           'senderName': 'Caio Silva',
           'senderCPF': '22111944785',
           'senderAreaCode': '11',
           'senderPhone': '56273440',
           'senderEmail': 'comprador@uol.com.br',
           'senderHash': '',              //
           'shippingAddressStreet': 'Av.Brig.FariaLima',
           'shippingAddressNumber': '1384',
           'shippingAddressComplement': '5oandar',
           'shippingAddressDistrict': 'JardimPaulistano',
           'shippingAddressPostalCode': '01452002',
           'shippingAddressCity': 'SaoPaulo',
           'shippingAddressState': 'SP',
           'shippingAddressCountry': 'BRA',
           'shippingType': '1',
           'shippingCost': '1.00',
           'creditCardToken': '8f13c508cdcb4ddf9f3a8f472ac8e3d9',        //TOKEN DO CARTÂO FEITO NA TOKENIZAÇÂO ANTERIOR,MUDA SEMPRE
           'installmentQuantity': '5',
           'installmentValue': '125.22',
           'noInterestInstallmentQuantity': '2',
           'creditCardHolderName': 'Caio Silva',
           'creditCardHolderCPF': '22111944785',
           'creditCardHolderBirthDate': '27/10/1987',
           'creditCardHolderAreaCode': '11',
           'creditCardHolderPhone': '56273440',
           'billingAddressStreet': 'Av.Brig.FariaLima',
           'billingAddressNumber': '1384',
           'billingAddressComplement': '5oandar',
           'billingAddressDistrict': 'JardimPaulistano',
           'billingAddressPostalCode': '01452002',
           'billingAddressCity': 'SaoPaulo',
           'billingAddressState': 'SP',
           'billingAddressCountry': 'BRA' 
           });
           var config = {
             method: 'post',
             url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=guillerbrasilrj@gmail.com&token=EAD7FC0724EF424294BE1A3C3D62FEF2',
             headers: { 
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             data : data
           };
           
           axios(config)
           .then(function (response) {
             console.log(JSON.stringify(response.data));
             return res.json(response.data);
           })
           .catch(function (error) {
             console.log(error);
             return res.json(error);
           });
}






//   //PAG SEGURO URL
//   const url_mode = process.env.URLPAGSEG;
//   //var url = "https://df.uol.com.br/v2/cards";

//   var url = url_mode + "/v2/cards";

//   var data = {
//     scope: "oob",
//     grant_type: "client_credentials"
//   };

//   axios
//     .post(url, data, {
//       headers: {
//         //"Accept": "application/json, text/plain, */*",
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic YWE4ZjJjNGMtYThlYS00MjMxLTg0MmEtZTFiODUyZWM2YjEzOjgwZTMwN2Q4LWNmOGItNDU1NC05M2M5LTNmYzdmMDA0ZjVkYQ=="
//       }
//     })
//     .then(data => {
//       //console.log("data", data);
//       return res.json(data.data);
//     })
//     .catch(e => {
//       console.log("error", e);
//       return res.json(e);
//     });
//};
