//PAG SEGURO GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
var qs = require("qs");
//import firebase from '../../firebase';

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
const User = require("../../models/mongo/userModel");
const PagSeguro = require("../../models/mongo/pagSeguro/pagSeguroModel");
const PagSeguroSessionId = require("../../models/mongo/pagSeguro/pagSeguroSessionModel");


//ENV KEYS
// const Token = process.env.GETNETTOKENS;
//const sessionId = process.env.SESSIONID;

exports.pagsegSession = async (req, res, next) => {
  

  //var url = process.env.URL;
  var email = process.env.EMAIL;
  var token = process.env.TOKEN;
  
  var config = {
    method: "post",
    url:
      `https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=${email}&token=${token}`,
    headers: {}
  };


  axios(config)
    .then(function(response) {
      //console.log(JSON.stringify(response.data));
      //return res.json(response.data);
      //return res.send(response.data)

      
     // const sessionId = response.data;

      const regexexp = /<id>(.+?)<\/id>/
      const sessionMatch = regexexp.exec(response.data)
      const sessionId = sessionMatch[1];
    
      const session_Id = new PagSeguroSessionId({
    
        sessionId,
    
      });
    
      session_Id.save();
      return res.send(response.data);
    })

    .catch(function(error) {
      console.log(error);
    });
};

exports.pagsegTokenCard = async (req, res, next) => {
  const {
    //sessionId,
    amount,
    cardNumber,
    cardBrand,
    cardCvv,
    cardExpirationMonth,
    cardExpirationYear
  } = req.body;

  const sessionId = process.env.SESSIONID;             //REQUIRED SESSION ID-Token expiration. 
  

  
  // const PagSeguroSessionId = await PagSeguroSessionId.findOne({ where: {sessionId} });
  // const sessionId = PagSeguroSessionId;
  // console.log(PagSeguroSessionId);
  //const sessionId = PagSeguroSessionId.findOne({ where: {sessionId} });  

  var data = qs.stringify({
    sessionId: sessionId,                              //REQUIRED SESSION ID-TOKEN expiration.
    amount: "11",
    cardNumber: cardNumber,
    cardBrand: "Visa",
    cardCvv: cardCvv,
    cardExpirationMonth: cardExpirationMonth,
    cardExpirationYear: cardExpirationYear
  });

  var config = {
    method: "post",
    url: "https://df.uol.com.br/v2/cards\n",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  };

  axios(config)
    .then(function(response) {
      //console.log(JSON.stringify(response.data));
      //console.log(JSON.stringify(response.data.token));
      //return res.json(response.data.token);
      //console.log(config);

      const token_card = response.data.token;
      console.log(token_card);
      const cardToken = new PagSeguro({
        
        token_card,           //response data API and save 
        //sessionId,
        amount,
        cardNumber,
        cardBrand,
        cardCvv,
        cardExpirationMonth,
        cardExpirationYear
      });

      cardToken.save();                                // functin mongoose .save() datas in pagseguros colletion/model

      //return res.json(response.data.token);
      // res.send(response.data.token);
      //res.json("Success!");
      //console.log(token_card);
      //return res.send(token_card);
      return res.send(response.data.token);
      
    })
    .catch(function(error) {
      console.log(error);
      return res.json("Error!");
    });
};

exports.pagsegPayment = async (req, res, next) => {

  //const { installmentValue } = req.body;
  //const creditCardToken = await PagSeguro.findOne({ email, password: hashedPassword });  

  //PagSeguro.findOne()

  var data = qs.stringify({

    //paymentMode: "default",
    //paymentMethod: "creditCard",                   
    //'receiverEmail': 'c23318287636434949818@sandbox.pagseguro.com.br',
    // 'extraAmount': '1.00',
    currency: "BRL",
    itemId1: "0001",                                              //REQUIRED
    itemDescription1: "NotebookPrata",                            //REQUIRED
    itemAmount1: "10300.00",                                      //REQUIRED
    itemQuantity1: "1",                                           //REQUIRED

    //  'itemId2':'0002',
    //  'itemDescription2':'Notebook Azul',
    //  'itemAmount2':'10000.00',
    //  'itemQuantity2':'1',

    // notificationURL: "https://sualoja.com.br/notifica.html",
    // reference: "REF1234",
    senderName: "Caio Silva",                                     //REQUIRED-
    senderCPF: "22111944785",                                     //REQUIRED-
    senderAreaCode: "11",                                         //REQUIRED-
    senderPhone: "56273440",                                      //REQUIRED-
    senderEmail: "c23318287636434949818@sandbox.pagseguro.com.br",     //REQUIRED-EMAIL USER BUYER
    //'senderHash': 'pUbfUdXTdakVu1U7',                                                
    shippingAddressStreet: "Av.Brig.FariaLima",                   //REQUIRED-
    shippingAddressNumber: "1384",                                //REQUIRED-           
    shippingAddressComplement: "5oandar",                         //REQUIRED-
    shippingAddressDistrict: "JardimPaulistano",                  //REQUIRED-
    shippingAddressPostalCode: "01452002",                        //REQUIRED-
    shippingAddressCity: "SaoPaulo",                              //REQUIRED-
    shippingAddressState: "SP",                                   //REQUIRED-
    shippingAddressCountry: "BRA",                                //REQUIRED-
    //'shippingType': '1',
    //'shippingCost': '1.00',
    creditCardToken: "6f27d0b8a5db47579e6c7e12bbf3bcc6",          //REQUIRED-HASH TOKEN CARD-IMPORTANT 
    installmentQuantity: "1",                                     //REQUIRED-QUANTIDADE DE PRESTAÇÕES
    installmentValue: "10300.00",                                 //REQUIRED-VALOR DA PRESTAÇÃO
    // 'noInterestInstallmentQuantity': '4',
     creditCardHolderName: "Caio Silva",                          //REQUIRED-
     creditCardHolderCPF: "22111944785",                          //REQUIRED-        
    // creditCardHolderBirthDate: "27/10/1987",
    // creditCardHolderAreaCode: "11",
    // creditCardHolderPhone: "56273440",
     billingAddressStreet: "Av.Brig.FariaLima",                   //REQUIRED-
     billingAddressNumber: "1384",                                //REQUIRED-
    // billingAddressComplement: "5oandar",
     billingAddressDistrict: "JardimPaulistano",                  //REQUIRED-
     billingAddressPostalCode: "01452002",                        //REQUIRED-
     billingAddressCity: "SaoPaulo",
     billingAddressState: "SP",                                   //REQUIRED-
     billingAddressCountry: "BRA"                                 //REQUIRED-
  });


  var email = process.env.EMAIL;
  var token = process.env.TOKEN;
  
  var config = {
    method: "post",
    url:
      `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=${email}&token=${token}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  };


  axios(config)
    .then(function(response) {
      //console.log(JSON.stringify(response.data));
      return res.send(response.data);
      //return res.json(response.data);
    })
    .catch(function(error) {
      console.log(error);
      return res.json(error);
    });
};

exports.pagsegBoleto = async (req, res, next) => {
  //const { sessionId, amount, cardNumber, cardBrand, cardCvv, cardExpirationMonth, cardExpirationYear } = req.body;

  var data = qs.stringify({
    paymentMode: "default",
    paymentMethod: "boleto",
    //'receiverEmail': 'c23318287636434949818@sandbox.pagseguro.com.br',
    currency: "BRL",
    extraAmount: "1.00",
    itemId1: "0001",
    itemDescription1: "NotebookPrata",
    itemAmount1: "24300.00",
    itemQuantity1: "1",
    notificationURL: "https://sualoja.com.br/notifica.html",
    reference: "REF1234",
    senderName: "Caio Silva",
    senderCPF: "22111944785",
    senderAreaCode: "11",
    senderPhone: "56273440",
    senderEmail: "c23318287636434949818@sandbox.pagseguro.com.br", //REQUIRED
    //'senderHash': '{{ADICIONE O HASH}}',
    shippingAddressStreet: "Av.Brig.FariaLima",
    shippingAddressNumber: "1384",
    shippingAddressComplement: "5oandar",
    shippingAddressDistrict: "JardimPaulistano",
    shippingAddressPostalCode: "01452002",
    shippingAddressCity: "SaoPaulo",
    shippingAddressState: "SP",
    shippingAddressCountry: "BRA",
    shippingType: "1",
    shippingCost: "1.00"
  });

  var email = process.env.EMAIL;
  var token = process.env.TOKEN;

  var config = {
    method: "post",
    url:
    `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=${email}&token=${token}`,
    headers: {
       "Content-Type": "application/x-www-form-urlencoded"
    },
       data: data
  };


  axios(config)
    .then(function(response) {
      console.log(JSON.stringify(response.data));
      //return res.json(response.data);
      return res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
      return res.json(error);
    });
};

// https://dev.pagseguro.uol.com.br/reference/introducao

// https://sandbox.pagseguro.uol.com.br/

// https://documenter.getpostman.com/view/4711102/SVfGyC4D?version=latest

// BUG: https://github.com/r-martins/PagSeguro-Magento-Transparente/issues/30
