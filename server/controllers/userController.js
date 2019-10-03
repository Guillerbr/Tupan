// server/controllers/userController.js

const User = require('../models/userModel');
const Balance = require('../models/balanceModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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



//function register 
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


//function login logic 
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'))
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
    }
}


//function get total users
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
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
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
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        next(error)
    }
}


//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
        next(error)
    }
}


//grantAccess executes permission if user has authorization                //IMPORTANT
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
        //  return res.status(400).send({ error: 'Registration failed' });
        next(error);
    }

}

//new function restrict acess
//get user individual data
exports.basic = async (req, res, next) => {


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

//get balance
exports.getBalance = async (req, res, next) => {


    const balances = await Balance.find({});
    res.status(200).json({
        data: balances
    });

}

//post balance
exports.postBalance = async (req, res, next) => {


    try {
        const { balance, deposits } = req.body;
        const newBalance = new Balance({ balance, deposits, user: req.user })

        await newBalance.save();

        res.json({
            data: newBalance

        });

    } catch (err) {
        return res.status(400).send({ error: 'Post balance failed' });
    }

}

//update balance user
exports.updateBalance = async (req, res) => {
    try {
        const update = req.body
        const balanceId = req.params.balanceId;
        await Balance.findByIdAndUpdate(balanceId, update);
        const balance = await Balance.findById(balanceId)
        res.status(200).json({
            data: balance,
            message: 'Balance has been updated'
        });
    } catch (err) {
        return res.status(400).send({ error: 'Update balance failed' });
    }
}

//delete balance user
exports.deleteBalance = async (req, res) => {
    try {
        const update = req.body
        const balanceId = req.params.balanceId;
        await Balance.findByIdAndDelete(balanceId, update);
        const balance = await Balance.findById(balanceId)
        res.status(200).json({
            message: 'Balance has been deleted'
        });
    } catch (err) {
        return res.status(400).send({ error: 'Delete balance failed' });
    }
}


//ping get status api public
exports.pingme = async (req, res) => {
    res.status(200).json({
        message: "Server OK"
        
    });
}