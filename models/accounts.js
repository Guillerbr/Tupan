'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    member_id: DataTypes.INTEGER,
    currency_id: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    locked: DataTypes.DECIMAL
  }, {});
  Accounts.associate = function(models) {
    // associations can be defined here
  };
  return Accounts;
};