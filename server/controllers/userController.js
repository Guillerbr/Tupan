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
   
   exports.signup = async (req, res, next) => {
    try {
     const { email, password, role } = req.body
     const hashedPassword = await hashPassword(password);
     const newUser = new User({ email, password: hashedPassword, role: role || "basic" });
     const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
     });
     newUser.accessToken = accessToken;
     await newUser.save();
     res.json({
      data: newUser,
      accessToken
     })
    } catch (error) {
     next(error)
    }
   }

  