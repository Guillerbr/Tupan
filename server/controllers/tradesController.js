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


//update trades
exports.updateTrade = async (req, res) => {

  const { price, volume } = req.body;

  const tradesId = req.params.tradesId;
                

    if(price == null)
    return res.status(400).send({ error: 'Price should be sent'})

    if(volume == null)
    return res.status(400).send({ error: 'Volume should be sent'})

    
      try {
       
         const trade_update = await Trades.findOne({ attributes: ['price','volume','id'], where: {} }) 
         
      if (!trade_update)
          return res.status(400).send({ error: 'Order not found' });

        

         await trade_update.update({
          
          price : price,
          volume : volume, 
          //id : tradesId
          
      
           })
                                               
     //res.send({ Successfully: true, user: req.userId });     //ok return user id,alter response sucess mensage
      
      
      res.status(200).json({
          message: "Order changed successfully"

      }); 

  } catch (err) {
      console.log(err);
      
      res.status(400).send({ error: 'Cannot update order, try again' });

  }
}




//delete order
exports.deleteTrade = async (req, res, next) => {
  try {
    const id = req.body
    const update = id;
    const tradesId = req.params.tradesId;
    //await Trades.destroy(tradesId, update);

    //({ attributes: ['price','volume'], where: {email} })
/*
    Trades.destroy('`name` LIKE "J%"').success(function() {
      // We just deleted all rows that have a name starting with "J"
  })



  */
   
  
    await Trades.destroy({
      where: {
          // criteria
          //attributes: ['trades'], where: {id}
          
           attributes: ['id'],

      }
      
  })      

    //const balance = await Trades.findById(orderId)
    res.status(200).json({
        message: 'Order has been deleted'
    });
} catch (err) {
   console.log(err)
    return res.status(400).send({ error: 'Error delete order failed' });
}
}





/*

findAll({
  attributes: ['foo', 'bar']
});

const trades = await Trades.findOne({ attributes: ['price','volume'], where: {email} })


*/
