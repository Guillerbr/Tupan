//LIBS
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//DB MYSQL SEQUELIZE CONFIG
//require("../../../config/config.json");

// ACL-RBAC Roles
const { roles } = require("../../roles");

//DB MODELS
const User = require("../../models/mongo/userModel");
//const User = require("../../../models/users.js");
//const Balance = require("../models/mongo/balanceModel");

//BCRYPT FUNCTION HASH CRIPTOG PASSWORD
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
//BCRYPT FUNCTION VALIDATE PASSWORD
async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

//SENDGRIP API EMAIL
const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//grantAccess executes permission if user has authorization                       //IMPORTANT
exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.users.role)[action](resource); //IMPORTANT SET TABLE DB ROLE USERS
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

//allows access if user is logged in
exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const users = res.locals.loggedInUser;
    if (!users)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });

    req.users = users; //IMPORTANT SET TABLE DB USERS
    next();
  } catch (error) {
    return res.status(400).json({ error: "Registration failed" });
    // next(error);
  }
};

//error jwt return not valid
//function register basic user
//role access control config
exports.signup = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    //check fild email and password filled
    if (!email)
      return res.status(400).send({ error: "Email field must be filled" });
    if (!password)
      return res.status(400).send({ error: "Password field must be filled" });

    // check if email user exist in db,if yes,returns or error.
    if (await User.findOne({ where: { email } }))         //mongoose function
    //if (await User.findOne(email))                      //sequelize  or sql orm fuction-update
     
      return res.status(400).send({ error: "User already registered" });

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "basic",
    });

    //important config role signup
    //option function role :   role: "basic"      or     role: role || "basic" });

    /*
          const accessToken = jwt.sign({  where: {email} }, process.env.JWT_SECRET, {            //to implement return 400 message expiration token 
              expiresIn: "1d"                                                                    // error token x access token does not work
          });
  
          newUser.accessToken = accessToken;
  
      */

    await newUser.save();
    res.json({
      Success: "User created successfully!Go to login!",
      //data: newUser,                                                                   //return of sensitive user data //IMPORTANT BLOK
      //accessToken
      data: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.log(error);
    // next(error)
    return res.status(400).json({ error: "Error creating user,try again!" });
  }
};

//FUNCTION LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //const user = await User.findOne({ where: { email } }); //mysql: where: {email}
    const user = await User.findOne({ where:  email  }); //mysql: where: {email}
    //if (!user) return res.status(400).send({ error: "Email does not exist" });
    //const validPassword = await validatePassword(password, user.password);
    if (!validPassword)
      return res.status(400).send({ error: "Password incorrect" });

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findAll({ where: user.id, accessToken }); //mongo function:  findByIdAndUpdate
    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken,
    });
  } catch (error) {
    next(error);
    console.log(error);
    //return res.status(400).send({ error: 'Acess Token invalid go to login' });
  }
};

//forgot-password
exports.authforgot2faPassword = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1); //1 HR valid token

    await user.update({
      passwordResetToken: token,
      passwordResetExpires: now,
    });

    const msg = {
      to: email,
      from: "apitest@api.com", //'apinet@gmail.com'
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: token,
      email,
      //'<strong>and easy to do anywhere fd, even with Node.js {token} </strong> {token}',
    };

    sgMail.send(msg);

    //res.send({ Successfully: true, user: req.token });
    console.log(sgMail);
    console.log(token);
    console.log(now);
    //console.log(error);

    res.status(200).json({
      Success: "Request sent successfully,check token in your email!",
    });
  } catch (err) {
    //console.log(err);
    res.status(400).send({ error: "E-mail does not exist!" });
  }
};
