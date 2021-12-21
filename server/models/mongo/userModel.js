// server/models/mongo/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
 email: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'basic',                                                  //config acesscontrol-important
  enum: ["basic", "supervisor", "admin", "manager", "final_user"]    //config acesscontrol-important
 },
 accessToken: {
  type: String
 },
 passwordResetToken: {
    type: String,
    select: false,
},
 passwordResetExpires: {
    type: Date,
    select: false,
},
 fullName: {
    type: String,
    //required: true,
},
 country_code: {
    type: String,
    //required: true,
},
 cellphone: {
    type: String,
    //required: true,
},
 verified: {
    type: Boolean,
    default: false,
},
 authyId: String,
  email: {
    type: String,
    //required: true,
    unique: true,
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

const User = mongoose.model('user', UserSchema);

module.exports = User;






