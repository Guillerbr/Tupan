//MERCADO PAGO GATEWAY

const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//Mercado Pago endpoint url API

var url =
  "https://api.mercadopago.com/v1/payments?access_token=TEST-3552148219199711-053122-126fa4e90d25c9119053b9701253bd30-564201252";

exports.mpPayment = async (req, res, next) => {
  //  const { CardNumber, ExpirationDate, SecurityCode } = req.body

  var data = {
    token: "b3a7dbec3eb0d71798c4f19fec445795",
    installments: 1,
    transaction_amount: 58.8,
    description:
      "Point Mini a maquininha que dá o dinheiro de suas vendas na hora",
    payment_method_id: "visa",
    payer: {
      email: "test_user_123456@testuser.com",
      identification: {
        number: "19119119100",
        type: "CPF"
      }
    },
    notification_url: "https://www.suaurl.com/notificacoes/",
    sponsor_id: null,
    binary_mode: false,
    external_reference: "MP0001",
    statement_descriptor: "MercadoPago",
    additional_info: {
      items: [
        {
          id: "PR0001",
          title: "Point Mini",
          description:
            "Producto Point para cobros con tarjetas mediante bluetooth",
          picture_url:
            "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
          category_id: "electronics",
          quantity: 1,
          unit_price: 58.8
        }
      ],
      payer: {
        first_name: "Nome",
        last_name: "Sobrenome",
        address: {
          zip_code: "06233-200",
          street_name: "Av das Nacoes Unidas",
          street_number: 3003
        },
        registration_date: "2019-01-01T12:01:01.000-03:00",
        phone: {
          area_code: "011",
          number: "987654321"
        }
      },
      shipments: {
        receiver_address: {
          street_name: "Av das Nacoes Unidas",
          street_number: 3003,
          zip_code: "06233200",
          city_name: "Buzios",
          state_name: "Rio de Janeiro"
        }
      }
    }
  };

  axios
    .post(url, data, {
      headers: {
       
        "Content-Type": "application/json",
       
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
