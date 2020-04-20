const express = require("express");
const router = express.Router();
var request = require("request");


//__dirname, 'server',' api.js'

const dotenv = require("dotenv");
dotenv.config();


const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;


const headers = {
  "content-type": "text/plain;"
};

//API CHECK 
router.get("/test", (req, res) => res.json({ msg: "backend works" }));


//BLOCKCOUNT COUNT BLOCK
router.get("/getblockcount", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,      
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });


//BLOCKCHAIN INFO
router.get("/getblockchaininfo", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,      
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });


//BLOCKCHAIN 
router.get("/listwallets", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listwallets","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,      
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });


//BLOCKCHAIN 
router.get("/getnewaddress", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,      
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });

  

//NEWS ROUTES METHODS AND PARAMETROS FEATURES...




//ROUTES PARAMS
router.get("/getblock/:hash", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":["${
      req.params.hash
    }"]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });


//  http://localhost:4444/api/getblockhash/520482
router.get("/getblockhash/:index", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${
      req.params.index
    }]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });


//
router.get("/getrawtransaction/:id", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${
      req.params.id
    }"]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });


//
router.get("/getrawtransaction/:id", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${
      req.params.id
    }"]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,
      method: "POST",
      headers: headers,
      body: dataString
    };
    
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.send(data);
      }
    };
    request(options, callback);
  });






module.exports = router;



/*

DOCS:

https://github.com/Guillerbr/opendax/blob/master/docs/commands-list-bitcoin-wallet.txt

https://medium.com/@peterjd42/build-your-own-bitcoin-api-using-node-js-and-bitcoin-core-251e613623db

*/