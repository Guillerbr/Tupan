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
 

  bid: {
    type: Sequelize.STRING,
    required: true,
    trim: true
    
  },
  ask: {
    type: Sequelize.STRING,
    //required: true
    
  },
  market_id: {
    type: Sequelize.STRING,
    //required: true
    //indice PK 
  },
  price: {
    type: Sequelize.DECIMAL,
    //required: true
  },
  volume: {
    type: Sequelize.DECIMAL,
    //required: true
  },
  origin_volume: {
    type: Sequelize.DECIMAL,
    //required: true
    
  },
  fee: {
    type: Sequelize.DECIMAL,
    //required: true
    
  },
  state: {
    type: Sequelize.INTEGER,
    //required: true
    //indice PK
  },
  type: {
    type: Sequelize.STRING,
    //required: true
    //indice PK 
    
  },
  member_id: {
    type: Sequelize.INTEGER,
    //required: true
    //indice PK
    
  },
  ord_type: {
    type: Sequelize.STRING,
    //required: true
  },
  locked: {
    type: Sequelize.DECIMAL,
    //required: true
    //indice PK 
  },
  origin_locked: {
    type: Sequelize.DECIMAL,
    //required: true
  },
  funds_received: {
    type: Sequelize.DECIMAL,
    //required: true
  },
  trades_count: {
    type: Sequelize.INTEGER,
    //required: true
  },
 
 

  //timestamps: true,

});

//force create new table
//User.sync({ force: true });

module.exports = Orders;

/*

sequelize model:generate --name Orders --attributes bid:string,ask:string,market_id:string,price:decimal,volume:decimal,origin_volume:decimal,fee:decimal,state:integer,type:string,member_id:integer,ord_type:string,locked:decimal,origin_locked:decimal,funds_received:decimal,trades_count:integer
  
npx sequelize-cli db:migrate



*/