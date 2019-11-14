const User = require('../models/userModel');
const Paycielo = require('../models/paymentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Add this to the top of the file
const { roles } = require('../roles');


exports.cieloPayment = async (req, res, next) => {
    try {
        const balanceId = req.params.balanceId;
        const balance = await Balance.findById(balanceId);
        if (!balance) return res.status(400).json({ error: 'Balance does not exist' });
        res.status(200).json({
            data: balance
        });
    } catch (error) {
        // next(error)
        return res.status(400).send({ error: 'Error finding user' });
    }

}


