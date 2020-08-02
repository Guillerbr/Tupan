// server/models/balanceModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PagseguroSchema = new Schema({
    /*
        user: { 
            type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose Relational function
            ref: 'user',                              //user schema ref
            require: true
    
        },
        
    */


  token_card: {                  //pagseguro param-hash token card
    type: String,
    //required: true    
    //select: false,
  },

  sessionId: {                  //pagseguro param
    type: String,
    //required: true    
    //select: false,
  },

  amount: {                     //pagseguro param
    type: Number,
    //required: true    
    //select: false,
  }, 

  cardNumber: {                 //pagseguro param
    type: Number,
    //required: true
    //select: false,
  },

  cardCvv: {                    //pagseguro param
    type: Number,
    //required: true
    //select: false,
  },
  
  cardExpirationMonth: {        //pagseguro param
    type: String,
    //required: true
    //select: false,
  },

  cardExpirationYear: {         //pagseguro param
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
