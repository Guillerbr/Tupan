// server/routes/route.js
const express = require('express');
const router = express.Router();

//import controllers
const userController = require('../controllers/userController');
const balanceController = require('../controllers/balanceController');
const paycieloController = require('../controllers/pay-cieloController');
const twofactorController = require('../controllers/twofactorController');
const tradesController = require('../controllers/tradesController');



//routers auth
router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/forgot-password', userController.forgotPassword);

router.post('/reset-password', userController.resetPassword);



//auth 2fa google authentication
router.post('/2fa-generate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.tokengenerate);

router.post('/totp-generate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.totptokengenerate);

router.post('/2fa-validate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.tokenvalidate);



//twilio 2fa authy and sms 
//router.get('/twilio', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twilioauthy);
router.post('/twilio', twofactorController.twilioauthy);
//router.post('/register-sms', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twilioregistersmsauthy);
router.post('/register-sms', twofactorController.twilioregistersmsauthy);
//router.post('/twilio-push-app', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twiliopushnotficationauthapp);
router.post('/twilio-push-app', twofactorController.twiliopushnotficationauthapp);




//routers user 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.get('/userinfo', userController.userInfo);


//trades tradings
router.get('/trades', tradesController.trades);  

router.get('/trades/:tradesId', tradesController.getOneTrade);

router.post('/order', tradesController.postTrade);

router.delete('/trades/:tradesId', tradesController.deleteTrade);

router.put('/trades/:tradesId', tradesController.updateTrade);      



//routers payment credit card cielo gateway
//router.post('/payment', paycieloController.cieloPayment);
router.get('/payment', paycieloController.cieloPayment);



//router Balances in balanceController.js
router.get('/balances', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), balanceController.getBalances);

router.get('/balance/:balanceId', userController.allowIfLoggedin, balanceController.getBalance);

router.post('/balance', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), balanceController.postBalance);

router.put('/balance/:balanceId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), balanceController.updateBalance);

router.delete('/balance/:balanceId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), balanceController.deleteBalance);



//bitcoin core json rdp api
//router.post('/getblockchaininfo', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), balanceController.postBalance);






//test status api
router.get('/ping', userController.pingme);



//test send api email sendgrid-for dev-not use production-
router.get('/testmail', userController.testSendMail);



//admin signup user role register
router.post('/signupadmin', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.signupAdmin);




module.exports = router;