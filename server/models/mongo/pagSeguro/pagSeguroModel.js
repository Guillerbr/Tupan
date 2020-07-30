// server/models/balanceModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PagseguroSchema = new Schema({
    /*
        user: {
            type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose
            ref: 'user',                              //user schema ref
            require: true
    
        },
        
    */


  sessionId: {                  //getnet param
    type: String,
    //required: true    
    //select: false,
  },

  amount: {           //getnet param
    type: Number,
    //required: true    
    //select: false,
  }, 

  cardNumber: {          //getnet param
    type: Number,
    //required: true
    //select: false,
  },

  cardCvv: {                  //getnet param
    type: Number,
    //required: true
    //select: false,
  },
  
  cardExpirationMonth: {
    type: String,
    //required: true
    //select: false,
  },

  cardExpirationYear: {
    type: String,
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
  },
});

const PagSeguro = mongoose.model("pagseguro", PagseguroSchema);

module.exports = PagSeguro;
