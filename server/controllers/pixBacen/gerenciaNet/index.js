//PIX BACEN BR-GERENCIA NET MODULE

const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

exports.gerenciaNetDocumento = async (req, res, next) => {
    // const { CardNumber, Holder, ExpirationDate, SecurityCode } = req.body;
  
    //ENVS KEYS
    const url_mode = process.env.GERENCIANET_URL;
  
    //URL MODE
    var url = url_mode + "/documento";  
  
    
    var data = {
     
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
        //console.log(url);
      });
  };









