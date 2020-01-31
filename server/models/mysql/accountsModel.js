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

const Accounts = sequelize.define("accounts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  member_id: {
    type: Sequelize.INTEGER,
    required: true,
    trim: true
    //indice PK user-id
  },
  currency_id: {
    type: DataTypes.STRING(1234),
    required: true
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

module.exports = Accounts;

/*

/*

SEQUELIZE-CLI COMMANDS CREATE MODEL AND MIGRATIONS

sequelize model:generate --name Accounts --attributes member_id:integer,currency_id:string,balance:decimal,locked:decimal



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});



https://sequelize.org/master/class/lib/model.js~Model.html#updatevalues-options-promisearrayaffectedcount-affectedrows


*/
