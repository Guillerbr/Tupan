// server/controllers/userController.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function hashPassword(password) {             //functions bcrypt pass
    return await bcrypt.hash(password, 10);
   }
   
   async function validatePassword(plainPassword, hashedPassword) {    //bcrypt function auth
    return await bcrypt.compare(plainPassword, hashedPassword);
   }
   
  