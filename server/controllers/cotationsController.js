const User = require("../models/mysql/userModel");
const Balance = require("../models/mongo/balanceModel");

const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


exports.getSearch = async (req, res) => {
    
    var url =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo";

  var alphavangate_api_key = process.env.ALPHAVANTAGE_API_KEY;

  var data = {
   
  };

  axios
    .get(url, data, {
      headers: {
        "Content-Type": "application/json",
        //MerchantId: "b17ac0ba-ff14-408a-93d7-dbcba07363b0",
        //MerchantKey: "XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC"
      }
    })
    .then(data => {
      console.log("data", data);
      //return res.status(200).json({ data: { data }} );
      //return res.status(200).json( data ,data  );
      //res.status(data).json(data);
      //return res.status(data);

    })
    .catch(e => {
      console.log("error", e);
    });




};

exports.getCotations = async (req, res, next) => {
  // const { function, symbol, interval } = req.body

  //  var function = ;
  //  var symbol = ;
  //  var interval = ;

  //alphavantage endpoint url API cotations
  //https://www.alphavantage.co/
  var url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo";

  var alphavangate_api_key = process.env.ALPHAVANTAGE_API_KEY;

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
    .get(url, data, {
      headers: {
        "Content-Type": "application/json",
        //MerchantId: "b17ac0ba-ff14-408a-93d7-dbcba07363b0",
        //MerchantKey: "XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC"
      }
    })
    .then(data => {
      //console.log("data", data);
      //return res.status(200).json({ data: { data }} );
      //return res.status(200).json( data ,data  );
      //res.status(data).json(data);
      return res.status(data);

    })
    .catch(e => {
      console.log("error", e);
    });
};
