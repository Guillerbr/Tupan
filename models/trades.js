'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trades = sequelize.define('Trades', {
    price: DataTypes.DECIMAL,
    volume: DataTypes.DECIMAL,
    ask_id: DataTypes.INTEGER,
    bid_id: DataTypes.INTEGER,
    trend: DataTypes.INTEGER,
    market_id: DataTypes.STRING,
    ask_member_id: DataTypes.INTEGER,
    bid_member_id: DataTypes.INTEGER,
    funds: DataTypes.DECIMAL
  }, {});
  Trades.associate = function(models) {
    // associations can be defined here
  };
  return Trades;
};

