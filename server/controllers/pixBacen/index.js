//PIX BACEN BR
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
// const User = require("../../models/mongo/userModel");
// const Cielo = require("../../models/mongo/cielo/cieloModel");

exports.pixIndex = async (req, res, next) => {
  // const { CardNumber, Holder, ExpirationDate, SecurityCode } = req.body;

  //ENVS KEYS
  const url_mode = process.env.URLCIELO;

  //URL MODE
  var url = url_mode + "/1/sales/";

  
  var data = {
    MerchantOrderId: "2014111703",
    Customer: {
      Name: "Comprador crédito simples",
    },
    Payment: {
      Type: "CreditCard",
      Amount: 15700,
      Installments: 1,
      SoftDescriptor: "123456789ABCD",
      CreditCard: {
        CardNumber: CardNumber,
        Holder: Holder,
        ExpirationDate: ExpirationDate, // ex: 12/2030
        SecurityCode: SecurityCode,
        Brand: "Visa",
        CardOnFile: {
          Usage: "Used",
          Reason: "Unscheduled",
        },
      },
      IsCryptoCurrencyNegotiation: true,
    },
  };

  var MerchantId = process.env.MERCHANTID;
  var MerchantKey = process.env.MERCHANTKEY;

  axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        //"Accept": "application/x-www-form-urlencoded",

        MerchantId: MerchantId,
        MerchantKey: MerchantKey,
      },
    })
    .then((data) => {
      //console.log("data", data);
      //return res.json(data.data);
      //return res.json(data.data.Payment.ReturnMessage);

      const ReturnMessage = data.data.Payment.ReturnMessage;

      const newPayment = new Cielo({
        ReturnMessage, //response data API and save
        CardNumber,
        Holder,
        ExpirationDate,
        SecurityCode,
      });

      newPayment.save();
      return res.json(data.data.Payment.ReturnMessage);
    })
    .catch((e) => {
      console.log("error", e);
      return res.json(e);
    });
};
