//server/models/mysql/userModel.js

//const Mysqlconnect = require('../server');
"use strict";

const Sequelize = require("sequelize");

//sequelize connection data base
const sequelize = new Sequelize("node-acl-sequelize-test", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

/*
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql"
});
*/

const Markets = sequelize.define("markets", {
  id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    autoIncrement: true
  },

  ask_unit: {
    type: DataTypes.STRING(10),
    required: true,
    trim: true
    //indice PK 
  },
  bid_unit: {
    type: DataTypes.STRING(10),
    //required: true
    //indice PK 
  },
  ask_fee: {
    type: DataTypes.DECIMAL(17, 16),
    //required: true
  },
  bid_fee: {
    type: DataTypes.DECIMAL(17, 16),
    //required: true
  },
  min_ask_price: {
    type: DataTypes.STRING(32,16),
    //required: true
  },
  max_bid_price: {
    type: DataTypes.STRING(32,16),
    //required: true
    //indice PK
  },
  min_ask_amount: {
    type: DataTypes.STRING(32,16),
    //required: true
    //indice PK
  },
  min_bid_amount: {
    type: DataTypes.STRING(32,16),
    //required: true
    //indice PK
  },
  ask_precision: {
    type: Sequelize.INTEGER(4),
    //required: true
    //tinyint
  },
  bid_precision: {
    type: DataTypes.STRING(4),
    //required: true
    //indice PK
    //tinyint
  },
  position: {
    type: DataTypes.STRING(11),
    //required: true
    //indice PK
    //tinyint
  },
  enabled: {
    type: DataTypes.DATETIME,
    //required: true
     //indice PK 
  },
  created_at: {
    type: DataTypes.DATETIME,
    //required: true
  },
  updated_at: {
    type: DataTypes.DATE,
    //required: true
  },

  //timestamps: true,

});

//force create new table
User.sync({ force: true });

module.exports = Markets;

