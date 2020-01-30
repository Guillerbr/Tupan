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

create config/ in
config/databasemysql.js

module.exports = {

  dialect: "mysql"
  host: "localhost",
  username: "",
  password: "",
  database: "",
  define: {
    timestamps: true,
    underscored: true,
  },
  
};

env exemple:

module.exports = {

  dialect: "mysql"
  host:     process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
  
};
  



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});



https://sequelize.org/master/class/lib/model.js~Model.html#updatevalues-options-promisearrayaffectedcount-affectedrows


*/
