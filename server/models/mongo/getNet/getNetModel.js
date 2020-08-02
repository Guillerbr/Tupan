// server/models/balanceModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GetnetSchema = new Schema({
  /*
        user: {
            type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose
            ref: 'user',                              //user schema ref
            require: true
    
        },
        
    */
  status_payment: {
    type: String
  },

  number_token: {
    //getnet param
    type: String
    //required: true
    //select: false,
  },

  card_number: {
    //getnet param
    type: Number
    //required: true
    //select: false,
  },

  cardholder_name: {
    //getnet param
    type: Number
    //required: true
    //select: false,
  },

  expiration_month: {
    //getnet param
    type: Number
    //required: true
    //select: false,
  },

  expiration_year: {
    type: String
    //required: true
    //select: false,
  },

  cardExpirationYear: {
    type: String
    //required: true
    //select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const GetNet = mongoose.model("getnet", GetnetSchema);

module.exports = GetNet;
