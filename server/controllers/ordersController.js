const Orders = require("../models/mysql/ordersModel");


exports.postOrders = async (req, res, next) => {
    try {
      const trades = await Orders.findAll({});
  
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
  
  //post create order
  exports.postTrade = async (req, res, next) => {
    if (!req.body.price) {
      res.status(400).send({
        error: "Price can not be empty!"
      });
    }
  
    if (!req.body.volume) {
      res.status(400).send({
        error: "Volume can not be empty!"
      });
    }
  
    try {
      const { price, volume } = req.body;
      const newTrades = new Trades({
        price,
        volume
      });
  
      await newTrades.save();
      res.json({
        newTrades
      });
  
      //console.log(trades);
    } catch (error) {
      // next(error)
      console.log(error);
      return res.status(400).send({ error: "Error sending order" });
    }
  };