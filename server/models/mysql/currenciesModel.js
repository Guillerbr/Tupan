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

const Currencies = sequelize.define("currencies", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: Sequelize.STRING(255),
    required: true,
    trim: true
    //indice PK user-id
  },
  blockchain_key: {
    type: DataTypes.STRING(32),
    //required: true
    //indice PK currency_id	
  },
  balance: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  },
  locked: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  }
});

//force create new table
User.sync({ force: true });

module.exports = Currencies;

/*

sequelize model:generate --name Currencies --attributes name:string,blockchain_key:string,balance:decimal,locked:decimal









https://sequelize.org/master/class/lib/model.js~Model.html#updatevalues-options-promisearrayaffectedcount-affectedrows


*/
