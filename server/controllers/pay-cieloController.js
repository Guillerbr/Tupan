const User = require('../models/userModel');
const Payment = require('../models/paymentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const axios = require('axios');

//const URL = 'https://apisandbox.cieloecommerce.cielo.com.br'

// Add this to the top of the file-roles acl file logic
const { roles } = require('../roles');


exports.cieloPayment = async (req, res, next) => {

    //const MerchantId = 'b17ac0ba-ff14-408a-93d7-dbcba07363b0'
    //const MerchantKey = 'XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC'
    //const Content-Type = "application/json"

    const MerchantId = process.env.MERCHANTID
    const MerchantKey = process.env.MERCHANTKEY




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
        const { CardNumber, Holder, ExpirationDate, SecurityCode, Amount } = req.body

        const newPayment = new Payment({ CardNumber, Holder, ExpirationDate, SecurityCode, Amount })


        // let = MerchantId = 'b17ac0ba-ff14-408a-93d7-dbcba07363b0'
        // let = MerchantKey = 'XKSPPVZAZGAXATFPYBLNLKDHMLDMUENYIYJJXJUC'

        // const { MerchantId, MerchantKey } = req.headers;


        /*
                axios.post('https://apisandbox.cieloecommerce.cielo.com.br')
                    // .then(response => (this.info = response))
                    .then(function (data) {
                        console.log(data.headers);
                    });
        
          */

        axios
            .post('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',
                { headers: { MerchantId, MerchantKey } }) ,
               { body: newPayment }       // "Content-Type": "application/json", "application/x-www-form-urlencoded",
            .then(response => {
                // If request is good...

                console.log(response.data)
               // res.json(response.data)
               //res.json(response.data)
            })
            .catch((error) => {
                console.log(error)
                //console.log(response.data)
               // res.json(response.data)
            })




        await newPayment.save();





        res.json({
            data: newPayment

        });


        //  console.log(info)
        //console.log(response)
        //  console.log(newPayment)


    } catch (err) {
        return res.status(400).send({ error: 'Payment failed' });
        //console.log(response.data)

    }

}


