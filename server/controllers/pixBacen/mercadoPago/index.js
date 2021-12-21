//PIX BACEN BR-MERCADO PAGO API MODULE

const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

exports.PixMercadoPago = async (req, res, next) => {

    //POSTS INFOS CLIENT
    const { transaction_amount, payment_method_id } = req.body;

    //ENVS KEYS
    //const url_mode_mp_pix = process.env.MERCADO_PAGO_URL_PIX;
    const bearer_token = process.env.MERCADO_PAGO_BEARER_TOKEN_PIX
    const url_api = "https://api.mercadopago.com/v1/payments";

    //URL MODE
    //var url = url_mode + "/documento";
    var url = url_api;

    var data = {

        "transaction_amount": 6.2,
        "payment_method_id": "pix",
        "payer": {
            "first_name": "Teste",
            "last_name": "Last",
            "email": "gg@gmail.com",
            "identification": {
                "type": "CPF",
                "number": "12345678909"
            }
        },
        "description": "Produto 1",
        "external_reference": "1234567890",
        "notification_url": "https://webhook.site/12321"

    };

    axios
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + bearer_token
                //"Accept": "application/x-www-form-urlencoded",

            },
        })
        .then((data) => {
            return res.json(data.data)
        })
        .catch((e) => {
            //console.log("error", e);
            return res.json(e);

        });
};