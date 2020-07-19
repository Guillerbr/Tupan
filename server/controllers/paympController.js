//MERCADO PAGO GATEWAY

const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//mercado pago endpoint url API

var url =
  "https://api.mercadopago.com/v1/payments?access_token=TEST-3552148219199711-053122-126fa4e90d25c9119053b9701253bd30-564201252";

exports.mpPayment = async (req, res, next) => {
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
