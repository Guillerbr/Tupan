const Orders = require("../models/mysql/ordersModel");





exports.getOrders = async (req, res, next) => {
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
    return res.status(400).send({ error: "Error finding orders" });
  }
};



//post create order
exports.postOrders = async (req, res, next) => {
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

  if (!req.body.bid) {
    res.status(400).send({
      error: "Bid can not be empty!"
    });
  }

  if (!req.body.ask) {
    res.status(400).send({
      error: "Ask can not be empty!"
    });
  }

  try {
    const { price, volume, bid, ask } = req.body;
    const newOrders = new Orders({
      price,
      volume,
      bid,
      ask
    });

    await newOrders.save();
    res.json({
      newOrders
    });

    //console.log(trades);
  } catch (error) {
    // next(error)
    console.log(error);
    return res.status(400).send({ error: "Error sending order" });
  }
};



//update trades
exports.updateOrders = async (req, res) => {
  if (!req.body.price) {
    res.status(400).send({
      message: "Price can not be empty!"
    });
  }

  if (!req.body.volume) {
    res.status(400).send({
      message: "Volume can not be empty!"
    });
  }

  try {
    const { price, volume } = req.body;
    const ordersId = req.params.ordersId;
    const order_update = await Orders.findByPk(ordersId);

    await order_update.update({
      price: price,
      volume: volume
    });

    res.status(200).json({
      message: "Order changed successfully",
      price,
      volume
    });
  } catch (err) {
    console.log(err);

    res.status(400).send({ error: "Cannot update order, try again" });
  }
};

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
