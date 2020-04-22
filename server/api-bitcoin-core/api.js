//const express = require("express");
//const router = express.Router();
//var request = require("request");

//__dirname, 'server',' api.js'

const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
// const IP = process.env.RPC_IP;



//API CHECK
//router.get("/test", (req, res) => res.json({ msg: "backend works" }));

//review this function-WARNING-WARNING
exports.getBlockcount = async (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`;
  var options = {
    url: `http://${USER}:${PASS}@3.17.181.129:8332/`, // `http://${USER}:${PASS}@${IP}/`
    method: "POST",
    headers: headers,
    body: dataString
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
    console.log(error);
  };
  request(options, callback);
};



exports.getBlockchaininfo = async (req, res) => {
  try {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,      
      method: "POST",
      headers: headers,
      body: dataString
    };
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  } catch (err) {
    return res.status(400).send({ error: "Error Getblockchaininfo,try again." });
  }
};


exports.listWallets = async (req, res) => {
  try {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listwallets","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,      
      method: "POST",
      headers: headers,
      body: dataString
    };
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  } catch (err) {
    return res.status(400).send({ error: "Error List Wallets,try again." });
  }
};


exports.getNewaddress = async (req, res) => {
  try {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,      
      method: "POST",
      headers: headers,
      body: dataString
    };
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  } catch (err) {
    return res.status(400).send({ error: "Error Getnewaddress,try again." });
    //request(options, callback);
  }
};


/*

//BLOCKCOUNT COUNT BLOCK
router.get("/getblockcount", (req, res) => {
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`;
    var options = {
      url: `http://${USER}:${PASS}@3.17.181.129:8332/`,     // `http://${USER}:${PASS}@${IP}/`
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


//BLOCKCHAIN INFO-OK
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


//LISTWALLETS-OK 
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


//GETNEWADDRESS-OK 
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

*/

//module.exports = router;

/*

DOCS:

https://github.com/Guillerbr/opendax/blob/master/docs/commands-list-bitcoin-wallet.txt

https://medium.com/@peterjd42/build-your-own-bitcoin-api-using-node-js-and-bitcoin-core-251e613623db

*/
