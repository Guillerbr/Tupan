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
    calendario: {
      dataVencimento: "2020-12-31",
      recebivelAposVencimento: "true",
    },
    pagador: {
      cpf: "12345678909",
      nome: "Francisco da Silva",
    },
    valor: {
      original: "123.45",
    },
    chave: "12345-123456789-123456",
    solicitacaoPagador: "Cobrança dos serviços prestados.",
    infoAdicionais: [
      {
        nome: "Campo 1",
        valor: "Informação Adicional1 do PSP-Recebedor",
      },
      {
        nome: "Campo 2",
        valor: "Informação Adicional2 do PSP-Recebedor",
      },
    ],
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



/*

DOCS:
https://gerencianet.com.br/blog/gerencianet-se-prepara-para-lancar-sua-api-do-pix/#void




*/