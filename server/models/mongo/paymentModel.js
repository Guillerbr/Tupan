// server/models/balanceModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    /*
        user: {
            type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose
            ref: 'user',                              //user schema ref
            require: true
    
        },
        
    */
   
  NumberToken: {
    type: Number,
    required: true
    //select: false,
  },
  
  CardNumber: {
    type: Number,
    required: true
    //select: false,
  },

  Holder: {
    type: String,
    required: true
    //select: false,
  },

  ExpirationDate: {
    //exemple 12/2021
    type: String,
    required: true
    //select: false,
  },

  SecurityCode: {
    type: Number,
    required: true
    //select: false,
  },

  Amount: {
    type: Number,
    required: true
    //select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;
