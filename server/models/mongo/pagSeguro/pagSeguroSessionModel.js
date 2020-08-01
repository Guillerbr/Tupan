// server/models/balanceModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PagseguroSessionIdSchema = new Schema({
   
    /*
        user: {
            type: mongoose.Schema.Types.ObjectId,     //ref user id, moogoose
            ref: 'user',                              //user schema ref
            require: true
    
        },
        
    */



  sessionId: {                  //pagseguro param
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

const PagSeguroSessionId = mongoose.model("pagseguro-session-id", PagseguroSessionIdSchema);

module.exports = PagSeguroSessionId;
