// server/routes/route.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const balanceController = require('../controllers/balanceController');
const paycieloController = require('../controllers/pay-cieloController');
const twofactorController = require('../controllers/twofactorController');


//routers auth
router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/forgot-password', userController.forgotPassword);

router.post('/reset-password', userController.resetPassword);


//auth 2fa
router.post('/2fa-generate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.tokengenerate);

router.post('/totp-generate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.totptokengenerate);

router.post('/2fa-validate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.tokenvalidate);


//twilio 2fa
//router.get('/twilio', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twilioauthy);
router.get('/twilio', twofactorController.twilioauthy);
router.post('/register-sms', twofactorController.twilioregistersmsauthy);



//routers user 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.get('/userinfo', userController.userInfo);


//routers payment credit card cielo gateway
router.post('/payment', paycieloController.cieloPayment);


//router Balances in balanceController.js
router.get('/balances', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), balanceController.getBalances);

router.get('/balance/:balanceId', userController.allowIfLoggedin, balanceController.getBalance);

router.post('/balance', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), balanceController.postBalance);

router.put('/balance/:balanceId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), balanceController.updateBalance);

router.delete('/balance/:balanceId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), balanceController.deleteBalance);


//test status api
router.get('/ping', userController.pingme);


//test send api email sendgrid-for dev-not use production-
router.get('/testmail', userController.testSendMail);


//admin signup user role register
router.post('/signupadmin', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.signupAdmin);




module.exports = router;