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

const Orders = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },

  bid: {
    type: DataTypes.STRING(10),
    required: true,
    trim: true
    
  },
  ask: {
    type: DataTypes.STRING(10),
    //required: true
    
  },
  market_id: {
    type: DataTypes.STRING(20),
    //required: true
    //indice PK 
  },
  price: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  },
  volume: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
  },
  origin_volume: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
    
  },
  fee: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
    
  },
  state: {
    type: DataTypes.INTEGER(11),
    //required: true
    //indice PK
  },
  type: {
    type: Sequelize.STRING(8),
    //required: true
    //indice PK 
    
  },
  member_id: {
    type: DataTypes.INTEGER(4),
    //required: true
    //indice PK
    
  },
  ord_type: {
    type: DataTypes.STRING(30),
    //required: true
  },
  locked: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
    //indice PK 
  },
  origin_locked: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
  },
  funds_received: {
    type: DataTypes.DECIMAL(32,16),
    //required: true
  },
  trades_count: {
    type: DataTypes.INTEGER(11),
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

  //timestamps: true,

});

//force create new table
User.sync({ force: true });

module.exports = Orders;

/*

sequelize model:generate --name Orders --attributes bid:string,ask:string,market_id:string,price:decimal,volume:decimal,origin_volume:decimal,fee:decimal,state:integer,type:string,member_id:integer,ord_type:string,locked:decimal,origin_locked:decimal,funds_received:decimal,trades_count:integer
  
npx sequelize-cli db:migrate



*/