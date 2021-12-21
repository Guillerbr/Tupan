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

const Wallets = sequelize.define("wallets", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },

  blockchain_key: {
    type: DataTypes.STRING(32),
    required: true,
    trim: true
    
  },
  currency_id: {
    type: DataTypes.STRING(10),
    //required: true
    //indice PK
    
  },
  name: {
    type: DataTypes.STRING(64),
    //required: true
    
  },
  address: {
    type: DataTypes.STRING(255),
    //required: true
    
  },
  kind: {
    type: DataTypes.INTEGER(11),
    //required: true
    //indice PK
  },
  nsig: {
    type: DataTypes.INTEGER(11),
    //required: true
    
  },
  gateway: {
    type: DataTypes.STRING(20),
    //required: true
    
  },
  settings: {
    type: DataTypes.STRING(1000),
    //required: true
    
  },
  max_balance: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  },
  parent: {
    type: DataTypes.INTEGER(11),
    //required: true
    
  },
  status: {
    type: DataTypes.STRING(32),
    //required: true
    //indice PK
  },
  created_at: {
    type: DataTypes.DATETIME,
    //required: true
  },
  updated_at: {
    type: DataTypes.DATETIME,
    //required: true
  },

  /*
  completed_at:{
    type: DataTypes.DATETIME,
  },
*/

  //timestamps: true,
});

//force create new table
User.sync({ force: true });

module.exports = Wallets;


/*

sequelize model:generate --name Wallets --attributes id:integer,blockchain_key:string,currency_id:string,name:string,address:string,kind:integer,nsig:integer,gateway:string,setting:string,max_balance:decimal,parent:integer,status:string
  
npx sequelize-cli db:migrate




*/