/*
//const Trades = require("../../models/trades.js");
//var fs = require("fs");

const fs = require('fs');
const path = require('path');
const Trades = path.join(__dirname, '/models/users.js');

*/


//const { Sequelize } = require('sequelize');
//const Trades = require("../.././models/trades.js");

//model mysql user
const Trades = require("../models/mysql/tradesModel");   

exports.trades = async (req, res, next) => {
  try {
    const trades = await Trades.findAll({});

    // console.log(trades);
    res.status(200).json({
      data: trades
      //price,
      //volume
    });
    //console.log(trades);
  } catch (error) {
    // next(error)
    //console.log(error);
    return res.status(400).send({ error: "Error finding trades" });
  }
};


//post order
exports.postTrade = async (req, res, next) => {
  try {
    const { price, volume } = req.body;
    const newTrades = new Trades({
      price,
      volume
      
    });

    await newTrades.save();
    res.json({
       
        newTrades
    })

    
    //console.log(trades);
  } catch (error) {
    // next(error)
    console.log(error);
    return res.status(400).send({ error: "Error sending order" });
  }
};


exports.deleteTrade = async (req, res, next) => {
  try {
    const {  } = req.body;
    const newTrades = new Trades({
      price,
      volume
      
    });

    await newTrades.save();
    res.json({
       
        newTrades
    })

    
    //console.log(trades);
  } catch (error) {
    // next(error)
    console.log(error);
    return res.status(400).send({ error: "Error delete order" });
  }
};

/*

findAll({
  attributes: ['foo', 'bar']
});

const trades = await Trades.findOne({ attributes: ['price','volume'], where: {email} })


*/
