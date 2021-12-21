// server/routes/route.js
const express = require("express");
const router = express.Router();

//CONTROLLERS

//BIN API LIST CONTROLLERS
const binlistapiController = require("../controllers/gatewayPayments/binlistapiController");

//USERS CONTROLLERS
const userController = require("../controllers/userController");
const authforgotPassword = require("../controllers/authUsers/authusersController");

//2FA SECURITY ACCESS CONTROLLERS
const twofactorController = require("../controllers/authUsers/2faController");
//const twofactorController = require('../controllers/twofactorController');

//PIX BACEN CONTROLLERS
const pixIndex = require("../controllers/pixBacen/index.js");
const gerenciaNetDocumento = require("../controllers/pixBacen/gerenciaNet/index.js");
const PixMercadoPago = require("../controllers/pixBacen/mercadoPago/index.js");

//OPENBANK CONTROLLERS
const stoneController = require("../controllers/openBank/stone");

//GATEWAYS PAYMENTS CONTROLLERS
const paycieloController = require("../controllers/gatewayPayments/paycieloController");
const paympController = require("../controllers/gatewayPayments/paympController");
const paygetnetController = require("../controllers/gatewayPayments/paygetnetController");
const paypagsegController = require("../controllers/gatewayPayments/paypagseguroController");

// EXCHANGE CONTROLLERS
const balanceController = require("../controllers/balanceController");
const tradesController = require("../controllers/tradesController");
const ordersController = require("../controllers/ordersController");
const cotationsController = require("../controllers/cotationsController");


// ALPHA MARKET FINANCE API
const alphaMarketController = require("../controllers/financialMarket/alphaMarketController");
router.post("/finance/market/company", alphaMarketController.alphaMarket);


//2FA SECURITY ACCESS CONTROL
//const twofactorController = require('../controllers/twofactorController');

//          AUTH USERS

//     AUTH USERS ROTES

router.post("/signup", userController.signup);
//router.post('/login', userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.post("/auth/signup", authforgotPassword.signup);
router.post("/auth/login", authforgotPassword.login);
//router.post('/auth/forgot-password', authforgotPassword.forgotPassword);
//router.post('/auth/reset-password', authforgotPassword.resetPassword);
//router.post('/auth/reset-password', authforgotPassword.authforgot2faPassword);

//      USERS INFOS DETAILS

//ROUTES
router.get(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.getUser
);
router.get(
  "/users",
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "profile"),
  userController.getUsers
);
router.put(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "profile"),
  userController.updateUser
);
router.delete(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "profile"),
  userController.deleteUser
);
router.get("/userinfo", userController.userInfo);

//          USERS INFOS DETAILS END
//          AUTH USERS END

//           EXCHANGE

//BIN BANK LIST ROUTES
router.get("/bin/binlist", binlistapiController.binlistApi);

//EXCHANGE ROUTES
router.get(
  "/balances",
  userController.allowIfLoggedin,
  userController.grantAccess("readOwn", "balance"),
  balanceController.getBalances
);
router.get(
  "/balance/:balanceId",
  userController.allowIfLoggedin,
  balanceController.getBalance
);
router.post(
  "/balance",
  userController.allowIfLoggedin,
  userController.grantAccess("readOwn", "balance"),
  balanceController.postBalance
);
router.put(
  "/balance/:balanceId",
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "profile"),
  balanceController.updateBalance
);
router.delete(
  "/balance/:balanceId",
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "profile"),
  balanceController.deleteBalance
);

//          EXCHANGE  END

//           2FA

//2FA ROUTES
//GOOGLE AUTHENTICATION
router.post("/auth/2fa/generate", twofactorController.tokengenerate);
router.post("/auth/2fa/totp-generate", twofactorController.totptokengenerate);
router.post("/auth/2fa/validade", twofactorController.tokenvalidate);
//router.post('/totp-generate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'),twofactorController.totptokengenerate);
//router.post('/2fa-validate', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.tokenvalidate);

//2FA EMAIL TOKEN SEND
router.post("/auth/email/2fa/generate", twofactorController.twofactorAuthEmail);

//           2FA END

//           TWILLIO 2FA AND OUTHERS

//TWILLIO ROUTES
//router.get('/twilio', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twilioauthy);
router.post("/twilio", twofactorController.twilioauthy);
//router.post('/register-sms', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twilioregistersmsauthy);
router.post("/register-sms", twofactorController.twilioregistersmsauthy);
//router.post('/twilio-push-app', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'balance'), twofactorController.twiliopushnotficationauthapp);
router.post(
  "/twilio-push-app",
  twofactorController.twiliopushnotficationauthapp
);

//router.post('/2', twofactorController.twilioregistersmsauthy2);

//           TWILLIO 2FA AND OUTHERS END

//               PIX BACEN

//PIX BACEN ROUTES
router.get("/pixbr/index", pixIndex.pixIndex);

//GERENCIA NET
router.post(
  "/pixbr/gerencianet/documento",
  gerenciaNetDocumento.gerenciaNetDocumento
);

//MP PAYMENT PIX QRCODE 
router.post(
  "/pixbr/mp-payment/pix-pay",
  PixMercadoPago.PixMercadoPago
);



//               END PIX BACEN

//               OPEN BANKING

//OPENBANK ROUTES
router.get("/openbank/stone", stoneController.listBanks);
router.get("/openbank/stone:id", stoneController.listidBanks);

//               OPEN BANKING END

//               GATEWAYS PAYMENTS

//GATEWAYS ROUTES

//cielo
//router.post('/payment', paycieloController.cieloPayment);
router.post("/pay/cielo/payment", paycieloController.cieloPayment);

//mercado-pago
router.get("/pay/mp", paympController.mpPayment);

//getnet
router.post("/pay/getnet/auth", paygetnetController.getnetAuth);
router.post("/pay/getnet/token", paygetnetController.getnetToken);
router.post("/pay/getnet/payment", paygetnetController.getnetPayment);

//pag-seguro
router.post("/pay/pagseg/session", paypagsegController.pagsegSession);
router.post("/pay/pagseg/cardtoken", paypagsegController.pagsegTokenCard);
router.post("/pay/pagseg/payment", paypagsegController.pagsegPayment);
router.post("/pay/pagseg/billet", paypagsegController.pagsegBoleto);

//               GATEWAYS PAYMENTS END

//          RPC API BITCOIN CORE

//RPC API BITCOIN CORE CONTROLLERS
const rpc = require("../api-bitcoin-core/api.js");

//RPC API BITCOIN CORE ROUTES
router.get(
  "/rpc-btc/getblockcount",
  userController.allowIfLoggedin,
  rpc.getBlockcount
);
router.get(
  "/rpc-btc/getblockchaininfo",
  userController.allowIfLoggedin,
  rpc.getBlockchaininfo
);
router.get(
  "/rpc-btc/listwallets",
  userController.allowIfLoggedin,
  rpc.listWallets
);
router.get(
  "/rpc-btc/getnewaddress",
  userController.allowIfLoggedin,
  rpc.getNewaddress
);
router.get(
  "/rpc-btc/getblock/:hash",
  userController.allowIfLoggedin,
  rpc.getBlock
);
router.get(
  "/rpc-btc/getblockhash/:index",
  userController.allowIfLoggedin,
  rpc.getBlockhash
);
router.get(
  "/rpc-btc/getrawtransaction/:id",
  userController.allowIfLoggedin,
  rpc.getrawTransaction
);
router.get(
  "/rpc-btc/decoderawtransaction/:hex",
  userController.allowIfLoggedin,
  rpc.decoderawTransaction
);

// TRADING EXCHANGE

//ROUTES
router.get("/trades", tradesController.trades);
router.get("/trades/:tradesId", tradesController.getOneTrade);
router.post("/trade", tradesController.postTrade);
router.delete("/trades/:tradesId", tradesController.deleteTrade);
router.put("/trades/:tradesId", tradesController.updateTrade);

//ROUTES
router.get("/orders", ordersController.getOrders);
router.get("/orders/:ordersId", ordersController.getOneOrders);
router.post("/orders", ordersController.postOrders);
router.put("/orders/:ordersId", ordersController.updateOrders);
router.delete("/orders/:ordersId", ordersController.deleteOrders);

//      TRADING EXCHANGE MODE END

//cotations prices stocks,criptocurrency and others
router.get("/cotations", cotationsController.getCotations);
router.get("/search", cotationsController.getSearch);

//TEST STATUS API
router.get("/ping", userController.pingme);

//test send api email sendgrid-for dev-not use production-
router.get("/testmail", userController.testSendMail);

//admin signup user role register
router.post(
  "/signupadmin",
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "profile"),
  userController.signupAdmin
);

module.exports = router;
