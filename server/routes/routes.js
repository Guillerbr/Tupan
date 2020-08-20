// server/routes/route.js
const express = require('express');
const router = express.Router();



//2FA SECURITY ACCESS CONTROL
//const twofactorController = require('../controllers/twofactorController');

//EXCHANGE COINS STOKS
const balanceController = require('../controllers/balanceController');
const tradesController = require('../controllers/tradesController');
const ordersController = require('../controllers/ordersController');
const cotationsController = require('../controllers/cotationsController');





//GATEWAYS PAYMENTS CONTROLLERS
const paycieloController = require('../controllers/gatewayPayments/paycieloController');
const paympController = require('../controllers/gatewayPayments/paympController');
const paygetnetController = require('../controllers/gatewayPayments/paygetnetController');
const paypagsegController = require('../controllers/gatewayPayments/paypagseguroController');

//BIN BANKS LIST CONTROLLERS
const binlistapiController = require('../controllers/gatewayPayments/binlistapiController');

//RPC Bitcoin-Core service API controller
const rpc = require('../api-bitcoin-core/api.js');

//ENDPOINTS ROUTES



//AUTH USERS

//AUTHENTICATION USERS CONTROLLERS
const userController = require('../controllers/userController');
const authforgotPassword = require('../controllers/authUsers/authusersController');


//AUTH USERS ROTES
router.post('/signup', userController.signup);
//router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

router.post('/auth/signup', authforgotPassword.signup);
router.post('/auth/login', authforgotPassword.login);
//router.post('/auth/forgot-password', authforgotPassword.forgotPassword);
//router.post('/auth/reset-password', authforgotPassword.resetPassword);
//router.post('/auth/reset-password', authforgotPassword.authforgot2faPassword);




//2FA CONTROLLERS

//2FA SECURITY ACCESS CONTROLLERS
//const twofactorController = require('../controllers/authUsers/2faController');
const twofactorController = require('../controllers/twofactorController');


//2FA ROUTES
//GOOGLE AUTHENTICATION
router.post('/2fa-generate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.tokengenerate);
router.post('/totp-generate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'),twofactorController.totptokengenerate);
router.post('/2fa-validate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.tokenvalidate);


//TWILLIO
//router.get('/twilio', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twilioauthy);
router.post('/twilio', twofactorController.twilioauthy);
//router.post('/register-sms', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twilioregistersmsauthy);
router.post('/register-sms', twofactorController.twilioregistersmsauthy);
//router.post('/twilio-push-app', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twiliopushnotficationauthapp);
router.post('/twilio-push-app', twofactorController.twiliopushnotficationauthapp);




//OPENBANK CONTROLLERS
const stoneController = require('../controllers/openBank/stone');

//OPENBANK ROUTES
router.get('/openbank/stone', stoneController.listBanks);
router.get('/openbank/stone:id', stoneController.listidBanks);

//BIN BANK LIST CHECKER
router.get('/bin/binlist', binlistapiController.binlistApi);


//PAYMENTS GATEWAYS SERVICES APIs-Cielo,Mercado Pago,Getnet,
//cielo
//router.post('/payment', paycieloController.cieloPayment);
router.post('/pay/cielo/payment', paycieloController.cieloPayment);
//mercado-pago
router.get('/pay/mp', paympController.mpPayment);
//getnet
router.post('/pay/getnet/auth', paygetnetController.getnetAuth);
router.post('/pay/getnet/token', paygetnetController.getnetToken);
router.post('/pay/getnet/payment', paygetnetController.getnetPayment);
//pag-seguro
router.post('/pay/pagseg/session', paypagsegController.pagsegSession);
router.post('/pay/pagseg/cardtoken', paypagsegController.pagsegTokenCard);
router.post('/pay/pagseg/payment', paypagsegController.pagsegPayment);
router.post('/pay/pagseg/billet', paypagsegController.pagsegBoleto);




//RPC BITCOINCORE SERVICE API
router.get('/rpc-btc/getblockcount', userController.allowIfLoggedin, rpc.getBlockcount);
router.get('/rpc-btc/getblockchaininfo', userController.allowIfLoggedin, rpc.getBlockchaininfo);
router.get('/rpc-btc/listwallets', userController.allowIfLoggedin, rpc.listWallets);
router.get('/rpc-btc/getnewaddress', userController.allowIfLoggedin, rpc.getNewaddress);
router.get('/rpc-btc/getblock/:hash', userController.allowIfLoggedin, rpc.getBlock);
router.get('/rpc-btc/getblockhash/:index', userController.allowIfLoggedin, rpc.getBlockhash);
router.get('/rpc-btc/getrawtransaction/:id', userController.allowIfLoggedin, rpc.getrawTransaction);
router.get('/rpc-btc/decoderawtransaction/:hex', userController.allowIfLoggedin, rpc.decoderawTransaction);





//routers user 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
router.get('/userinfo', userController.userInfo);



//trades tradings    no auth
router.get('/trades',  tradesController.trades);  
router.get('/trades/:tradesId', tradesController.getOneTrade);
router.post('/trade', tradesController.postTrade);
router.delete('/trades/:tradesId', tradesController.deleteTrade);
router.put('/trades/:tradesId', tradesController.updateTrade);      



//orders tradings   no auth
router.get('/orders', ordersController.getOrders);
router.get('/orders/:ordersId', ordersController.getOneOrders);
router.post('/orders', ordersController.postOrders); 
router.put('/orders/:ordersId', ordersController.updateOrders);
router.delete('/orders/:ordersId', ordersController.deleteOrders);
    


//cotations prices stocks,criptocurrency and others
router.get('/cotations', cotationsController.getCotations); 
router.get('/search', cotationsController.getSearch); 



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