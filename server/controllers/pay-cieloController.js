//CIELO GATEWAY
const User = require("../models/mongo/userModel");
const Payment = require("../models/mongo/paymentModel");
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//cielo endpoint url API
var url = "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/";

exports.cieloPayment = async (req, res, next) => {
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body

  var data = {
    MerchantOrderId: "2014111703",
    Customer: {
      Name: "Comprador crédito simples"
    },
    Payment: {
      Type: "CreditCard",
      Amount: 15700,
      Installments: 1,
      SoftDescriptor: "123456789ABCD",
      CreditCard: {
        CardNumber: "1234123412341231",
        Holder: "Teste Holder",
        ExpirationDate: "12/2030",
        SecurityCode: "123",
        Brand: "Visa",
        CardOnFile: {
          Usage: "Used",
          Reason: "Unscheduled"
        }
      },
      IsCryptoCurrencyNegotiation: true
    }
  };

  axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        MerchantId: "b17ac0ba-ff14-408a-93d7-dbcba07363b0",
        MerchantKey: "XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC"

        //  "MerchantId": process.env.MERCHANTID,
        //  "MerchantKey": process.env.MERCHANTKEY
      }
    })
    .then(data => {
      console.log("data", data);
    })
    .catch(e => {
      console.log("error", e);
    });
};

/*

Cielo doc: https://developercielo.github.io/manual/cielo-ecommerce

SANDBOX
Requisições	     https://apisandbox.cieloecommerce.cielo.com.br
Consultas	     https://apiquerysandbox.cieloecommerce.cielo.com.br


PRODUÇÃO
Requisições		https://api.cieloecommerce.cielo.com.br/
Consultas		https://apiquery.cieloecommerce.cielo.com.br/


SANDBOX KEYS
MerchantId: "b17ac0ba-ff14-408a-93d7-dbcba07363b0"
MerchantKey: "XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC"

Json body data exemple:

{
   "MerchantOrderId":"2014111703",
   "Customer":{
      "Name":"Comprador crédito simples"
   },
   "Payment":{
     "Type":"CreditCard",
     "Amount":15700,
     "Installments":1,
     "SoftDescriptor":"123456789ABCD",
     "CreditCard":{
         "CardNumber":"1234123412341231",
         "Holder":"Teste Holder",
         "ExpirationDate":"12/2030",
         "SecurityCode":"123",
         "Brand":"Visa",
         "CardOnFile":{
            "Usage": "Used",
            "Reason":"Unscheduled"
         }
     },
     "IsCryptoCurrencyNegotiation": true
   }
}



*/
