'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    bid: DataTypes.STRING,
    ask: DataTypes.STRING,
    market_id: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    volume: DataTypes.DECIMAL,
    origin_volume: DataTypes.DECIMAL,
    fee: DataTypes.DECIMAL,
    state: DataTypes.INTEGER,
    type: DataTypes.STRING,
    member_id: DataTypes.INTEGER,
    ord_type: DataTypes.STRING,
    locked: DataTypes.DECIMAL,
    origin_locked: DataTypes.DECIMAL,
    funds_received: DataTypes.DECIMAL,
    trades_count: DataTypes.INTEGER
  }, {});
  Orders.associate = function(models) {
    // associations can be defined here
  };
  return Orders;
};