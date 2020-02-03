//mongo mongoose user controller
const User = require('../models/mongo/userModel');
const Balance = require('../models/mongo/balanceModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Add this to the top of the file
const { roles } = require('../roles')

//functions bcrypt pass
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

//bcrypt function auth
async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}


//get balance id
exports.getBalance = async (req, res, next) => {
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


//get all balances
exports.getBalances = async (req, res, next) => {


    const balances = await Balance.find({});
    res.status(200).json({
        data: balances
    });

}


//post balance
exports.postBalance = async (req, res, next) => {


    try {
        const { balance, deposits } = req.body;
        const newBalance = new Balance({ balance, deposits, user: req.user })

        await newBalance.save();

        res.json({
            data: newBalance

        });

    } catch (err) {
        return res.status(400).send({ error: 'Post balance failed' });
    }

}


//update balance user
exports.updateBalance = async (req, res) => {
    try {
        const update = req.body
        const balanceId = req.params.balanceId;
        await Balance.findByIdAndUpdate(balanceId, update);
        const balance = await Balance.findById(balanceId)
        res.status(200).json({
            data: balance,
            message: 'Balance has been updated'
        });
    } catch (err) {
        return res.status(400).send({ error: 'Update balance failed' });
    }
}


//delete balance user
exports.deleteBalance = async (req, res) => {
    try {
        const update = req.body
        const balanceId = req.params.balanceId;
        await Balance.findByIdAndDelete(balanceId, update);
        const balance = await Balance.findById(balanceId);
        res.status(200).json({
            message: 'Balance has been deleted'
        });
    } catch (err) {
        return res.status(400).send({ error: 'Delete balance failed' });
    }
}


