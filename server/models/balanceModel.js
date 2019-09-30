// server/models/balanceModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose
        ref: 'User',                             //user schema ref
        require: true,

    },
    balance: {
        type: Number,
        required: true
        //select: false,
    },
    deposits: {
        type: Number,
        required: true
        //select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },



});

const Balance = mongoose.model('balance', BalanceSchema);

module.exports = Balance;