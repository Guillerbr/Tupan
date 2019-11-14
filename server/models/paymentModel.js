// server/models/balanceModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    /*
        user: {
            type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose
            ref: 'user',                             //user schema ref
            require: true
    
        },
        
        */
    number_card: {
        type: Number,
        required: true
        //select: false,
    },
    name_card: {
        type: String,
        required: true
        //select: false,
    },
    date_card: {
        type: String,
        required: true
        //select: false,
    },
    cvv_card: {
        type: String,
        required: true
        //select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    



});

const Payment = mongoose.model('balance', PaymentSchema);

module.exports = Payment;