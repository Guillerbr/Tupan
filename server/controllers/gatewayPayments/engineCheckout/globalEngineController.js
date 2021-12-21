//BIN LIST GATEWAY
const BodyParser = require("body-parser");
const Express = require("express");
const axios = require("axios");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//MODELS DB
// const User = require("../../models/mongo/userModel");
// const Cielo = require("../../models/mongo/cielo/cieloModel");

exports.engineCheckouGlobal = async (req, res, next) => {
  //https://lookup.binlist.net/45717360
  const { bin } = req.body;

  var config = {
    method: "post",
    url: `https://lookup.binlist.net/${bin}`,
    headers: {},
  };

  //FEATURE- REPLACE OBJECT JSON ENGINE CHECKER

  axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      return res.json(response.data);
    })

    .catch(function (error) {
      console.log(error);
    });
};

/*
CHECK BIN CREDIT CARD APIs
https://binlist.net/
*/
