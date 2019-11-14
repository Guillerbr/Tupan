const User = require('../models/userModel');
const Payment = require('../models/paymentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const axios = require('axios');

// Add this to the top of the file-roles acl file logic
const { roles } = require('../roles');


exports.cieloPayment = async (req, res, next) => {

    try {
        const { CardNumber, Holder, ExpirationDate, SecurityCode, amount } = req.body

        const newPayment = new Payment({ CardNumber, Holder, ExpirationDate, SecurityCode, amount })

       // await axios();

        await newPayment.save();


        res.json({
            data: newPayment


        });


    } catch (err) {
        return res.status(400).send({ error: 'Payment failed' });


    }

}


