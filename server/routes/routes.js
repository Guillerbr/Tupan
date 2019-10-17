// server/routes/route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const balanceController = require('../controllers/balanceController');


//routers auth
router.post('/signup', userController.signup);

router.post('/login', userController.login);


//routers user 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.get('/userinfo', userController.userInfo);


//router Balances 

router.get('/balances',  userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance')  ,balanceController.getBalances);

router.get('/balance/:balanceId', userController.allowIfLoggedin, balanceController.getBalance);

router.post('/balance', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), balanceController.postBalance);

router.put('/balance/:balanceId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), balanceController.updateBalance);

router.delete('/balance/:balanceId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), balanceController.deleteBalance);


//test status api
router.get('/ping', userController.pingme);

//admin signup user role register
router.post('/signupadmin', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.signupAdmin);

//resetpassword
router.post('/resetpassword', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.resetPass);


module.exports = router;