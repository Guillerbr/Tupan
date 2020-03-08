const User = require('../models/mysql/userModel');
const Balance = require('../models/mongo/balanceModel');

const BodyParser = require("body-parser");
const Express = require("express");
const axios = require('axios');

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
