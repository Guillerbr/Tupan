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

const Deposits = sequelize.define("deposits", {
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
    type: DataTypes.STRING(10),
    //required: true
    //indice PK currency_id	
  },
  amount: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  },
  fee: {
    type: DataTypes.DECIMAL(32, 16),
    //required: true
  },
  address: {
    type: DataTypes.STRING(95),
    //required: true
  },
  txid: {
    type: DataTypes.STRING(128),
    //required: true
  },
  txout: {
    type: DataTypes.STRING(30),
    //required: true
  },
  aasm_state: {
    type: DataTypes.STRING(30),
    //required: true
  },
  block_number: {
    type: Sequelize.INTEGER(11),
    //required: true
  },
  type: {
    type: DataTypes.STRING(30),
    //required: true
  },
  tid: {
    type: DataTypes.STRING(64),
    //required: true
  },
  created_at: {
    type: DataTypes.DATETIME,
    //required: true
  },
  updated_at: {
    type: DataTypes.DATETIME,
    //required: true
  },
  completed_at: {
    type: DataTypes.DATE,
    //required: true
  },

  //timestamps: true,

});

//force create new table
User.sync({ force: true });

module.exports = Deposits;

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
