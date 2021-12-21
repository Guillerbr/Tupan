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

const Withdraws = sequelize.define("withdraws", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },

  account_id: {
    type: DataTypes.INTEGER(11),
    required: true,
    trim: true
    //indice PK 
  },
  member_id: {
    type: DataTypes.INTEGER(11),
    //required: true
    //indice PK 
  },
  currency_id: {
    type: DataTypes.STRING(10),
    //required: true
    //indice PK 
  },
  amount: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  },
  fee: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
  },
  txid: {
    type: DataTypes.STRING(128),
    //required: true
    //indice PK 
  },
  aasm_state: {
    type: DataTypes.STRING(30),
    //required: true
    
  },
  block_number: {
    type: DataTypes.INTEGER(11),
    //required: true
    
  },
  sum: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
    
  },
  type: {
    type: DataTypes.STRING(30),
    //required: true
    //indice PK 
    
  },
  tid: {
    type: DataTypes.STRING(64),
    //required: true
    //indice PK
    
  },
  rid: {
    type: DataTypes.STRING(95),
    //required: true
  },
  created_at: {
    type: DataTypes.DATE,
    //required: true
  },
  updated_at: {
    type: DataTypes.DATETIME,
    //required: true
  },
  completed_at:{
    type: DataTypes.DATETIME,
  },

  //timestamps: true,

});

//force create new table
User.sync({ force: true });

module.exports = Withdraws;

