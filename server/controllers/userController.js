// server/controllers/userController.js

const User = require('../models/userModel');
const Balance = require('../models/balanceModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Add this to the top of the file
const { roles } = require('../roles')

//functions bcrypt pass
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

//bcrypt function auth
async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}


//function register basic user
//role access control config 
exports.signup = async (req, res, next) => {
    try {

        const { email, password, role } = req.body

        //  check if email exist in db,if yes,returns or error
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already registered' });

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, role: role || "basic" });   //important config role signup
        //option function role :   role: "basic"      or     role: role || "basic" }); 

        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {         //to implement return 400 message expiration token 
            expiresIn: "1d"
        });

        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            //  data: newUser,                    //return of sensitive user data //      IMPORTANT BLOK 
            accessToken
        })
    } catch (error) {
        // next(error)
        return res.status(400).json({ error: 'Acess Token invalid go to login' });

    }
}


//function login 
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: 'Email does not exist' });
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return res.status(400).send({ error: 'Password incorrect' });

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken
        })
    } catch (error) {
        next(error);
        //return res.status(400).send({ error: 'Acess Token invalid go to login' });
    }
}


//function admin get total users and info
exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}


//get the user by his id   
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: 'User does not exist' });
        res.status(200).json({
            data: user
        });
    } catch (error) {
        // next(error)
        return res.status(400).send({ error: 'Error finding user' });
    }

}


//make user change update
exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId)
        res.status(200).json({
            // data: user,
            success: 'User has been updated'
        });
    } catch (error) {
        // next(error)
        return res.status(400).send({ error: 'Error update user' });
    }
}


//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            // data: null,
            success: 'User has been deleted'
        });
    } catch (error) {
        // next(error)
        return res.status(400).send({ error: 'Error delete user' });
    }
}


//grantAccess executes permission if user has authorization                      //IMPORTANT
exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);       //IMPORTANT
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}


//allows access if user is logged in
exports.allowIfLoggedin = async (req, res, next) => {
    try {

        const user = res.locals.loggedInUser;
        if (!user)
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ error: 'Registration failed' });
        // next(error);
    }

}


//get user individual data
exports.userInfo = async (req, res, next) => {

    try {
        const user = res.locals.loggedInUser;
        if (user)
            return res.status(200).json({
                data: user,
                message: 'User get information'
            });
        //req.user = user;

        next();
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }

}


//register users roles admin for admin
exports.signupAdmin = async (req, res, next) => {
    try {

        const { email, password, role } = req.body

        //  check if email exist in db,if yes,returns or error
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already registered' });

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


//test sendmail sendgrid
exports.testSendMail = async (req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'guillerbrasilrj@gmail.com',
        from: 'guillerbrasilrj@gmail.com',
        subject: 'Test api sendgrid status',
        text: 'Test ping API Sendgrid',
        html: '<strong>API service send email sendgrid is success!</strong>',
    };
    sgMail.send(msg);
    console.log(sgMail);

}


//forgot-password
exports.forgotPassword = async (req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        const msg = {
            to: email,
            from: 'apitest@api.com',     //    'apinet@gmail.com'
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: token, email,         //'<strong>and easy to do anywhere fd, even with Node.js {token} </strong> {token}',
        };

        sgMail.send(msg);

        //res.send({ Successfully: true, user: req.userId });      
        console.log(sgMail);
        console.log(token);
        res.status(200).json({
            Success: "Request sent successfully,check token in your email!"

        });

    } catch (err) {

        res.status(400).send({ error: 'E-mail does not exist!' });
    }
}


//reset-password
//add bcrypt function so the new password is encrypted
//The password arrives in the database, but not encrypted.
exports.resetPassword = async (req, res) => {

    const { email, token, password } = req.body;


    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate new token' });

        user.password = password;

        await user.save();
        // res.send({ Successfully: true, user: req.userId });     //ok return user id,alter response sucess mensage
        
        
        res.status(200).json({
            message: "Password changed successfully"

        }); 

    } catch (err) {
        //console.log(err);
        res.status(400).send({ error: 'Cannot reset password, try again' });

    }
}


//ping get status api public
exports.pingme = async (req, res) => {
    res.status(200).json({
        message: "Server OK"

    });
}