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

const Trades = sequelize.define("trades", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },

  price: {
    type: DataTypes.DECIMAL(32,16),
    required: true,
    trim: true
    
  },
  volume: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
    
  },
  ask_id: {
    type: DataTypes.INTEGER(11),
    //required: true
    //indice PK
  },
  bid_id: {
    type: DataTypes.INTEGER(11),
    //required: true
    //indice PK
  },
  trend: {
    type: DataTypes.INTEGER(11),
    //required: true
  },
  market_id: {
    type: DataTypes.STRING(20),
    //required: true
    //indice PK
  },
  ask_member_id: {
    type: DataTypes.INTEGER(11),
    //required: true
    //indice PK
  },
  bid_member_id: {
    type: DataTypes.INTEGER(11),
    //required: true
    //indice PK
  },
  funds: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  },
  created_at: {
    type: DataTypes.DATE,
    //required: true
    //indice PK
  },
  updated_at: {
    type: DataTypes.DATETIME,
    //required: true
  }

  /*
  completed_at:{
    type: DataTypes.DATETIME,
  },
*/

  //timestamps: true,
});

//force create new table
User.sync({ force: true });

module.exports = Trades;
