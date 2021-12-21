// server/models/balanceModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MercadopagoSchema = new Schema({
    /*
        user: {
            type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose
            ref: 'user',                              //user schema ref
            require: true
    
        },
        
    */


   CardNumber: {                  //getnet param
    type: Number,
    //required: true    
    //select: false,
  },

  Holder: {                    //cielo param
    type: String,
    //required: true    
    //select: false,
  }, 

  ExpirationDate: {            //cielo param  EX: 12/2030
    type: String,
    //required: true
    //select: false,
  },

  SecurityCode: {              //cielo param
    type: Number,
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

const MercadoPago = mongoose.model("mercadopago", MercadopagoSchema);

module.exports = MercadoPago;
