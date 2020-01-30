'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallets = sequelize.define('Wallets', {
    id: DataTypes.INTEGER,
    blockchain_key: DataTypes.STRING,
    currency_id: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    kind: DataTypes.INTEGER,
    nsig: DataTypes.INTEGER,
    gateway: DataTypes.STRING,
    setting: DataTypes.STRING,
    max_balance: DataTypes.DECIMAL,
    parent: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Wallets.associate = function(models) {
    // associations can be defined here
  };
  return Wallets;
};