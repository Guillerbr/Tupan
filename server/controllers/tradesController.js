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

  //const tradesId = await Trades.findById(id)
  await Trades.findById(tradesId)
                

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
         // id : tradesId
          
      
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
    //const id = req.body
    //const update = id;
    const tradesId = req.params.tradesId;
    
  

/*
  if (!tradesId)
  {
    res.status(400).json({
      message: 'Trade does not exist'
    });
  }
*/

 await Trades.destroy({where: { id: tradesId } })
  
    res.status(200).json({
        message: 'Order has been deleted'
    });
} catch (err) {
   console.log(err)
    return res.status(400).send({ error: 'Error delete order failed' });
     }
}



//get one trade for id
exports.getOneTrade = async (req, res, next) => {

try {
  
  const tradesId = req.params.tradesId;
  const trades = await Trades.findByPk(tradesId);

  await Trades.findAll({ where: trades.id })      
        res.status(200).json({
            data: { email: trades },
            
        });
      } catch (err) {
        console.log(err)
         return res.status(400).send({ error: 'Error returning trader' });
          }
       }




/*        
//await Trades.findByPk({where: { tradesId } })
await Trades.findByPk(tradesId)

  res.status(200).json({
      message: 'Success ' + tradesId,
      
  });
} catch (err) {
 console.log(err)
  return res.status(400).send({ error: 'Error returning trader' });
   }
}





/*

-Sequelize methods-

create a new Tutorial: create(object)
find a Tutorial by id: findByPk(id)
get all Tutorials: findAll()
update a Tutorial by id: update(data, where: { id: id })
remove a Tutorial: destroy(where: { id: id })
remove all Tutorials: destroy(where: {})
find all Tutorials by title: findAll({ where: { title: ... } })

*/
