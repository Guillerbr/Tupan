'use strict';
module.exports = (sequelize, DataTypes) => {
  const Currencies = sequelize.define('Currencies', {
    name: DataTypes.STRING,
    blockchain_key: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    locked: DataTypes.DECIMAL
  }, {});
  Currencies.associate = function(models) {
    // associations can be defined here
  };
  return Currencies;
};