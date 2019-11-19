const User = require('../models/userModel');
const Payment = require('../models/paymentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const axios = require('axios');

// Add this to the top of the file-roles acl file logic
const { roles } = require('../roles');


exports.cieloPayment = async (req, res, next) => {

    //const MerchantId = 'b17ac0ba-ff14-408a-93d7-dbcba07363b0'
    //const MerchantKey = 'XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC'
    //const Content-Type = "application/json"

    //  let MerchantId = 'b17ac0ba-ff14-408a-93d7-dbcba07363b0'
    //  let MerchantKey = 'XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC'
    //  let Content-Type = "application/json"

    /*
        const config = {
            headers: {
                "Content-Type": "application/json",
                MerchantId: "b17ac0ba-ff14-408a-93d7-dbcba07363b0",
                MerchantKey: "XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC"
                // 'RequestId': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
            }
        };
    */

    try {
        const { CardNumber, Holder, ExpirationDate, SecurityCode, amount } = req.body
        const newPayment = new Payment({ CardNumber, Holder, ExpirationDate, SecurityCode, amount })


        MerchantId = 'b17ac0ba-ff14-408a-93d7-dbcba07363b0'
        MerchantKey = 'XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC'

        const { MerchantId, MerchantKey } = req.headers;

        await axios.post('https://apisandbox.cieloecommerce.cielo.com.br')
            .then(response => (this.info = response))


        await newPayment.save();



        res.json({
            data: newPayment

        });


    } catch (err) {
        return res.status(400).send({ error: 'Payment failed' });


    }

}


