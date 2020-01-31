//server/models/mysql/userModel.js

//const Mysqlconnect = require('../server');
"use strict";

const Sequelize = require("sequelize");

//sequelize connection data base
const sequelize = new Sequelize("node-acl-sequelize-test", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

const Trades = sequelize.define("trades", {
  /*
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
   */

  price: {
    type: DataTypes.DECIMAL(32, 16),
    required: true,
    trim: true
  },
  volume: {
    type: DataTypes.DECIMAL(32, 16)
    //required: true
  },
  ask_id: {
    type: DataTypes.INTEGER(11)
    //required: true
    //indice PK
  },
  bid_id: {
    type: DataTypes.INTEGER(11)
    //required: true
    //indice PK
  },
  trend: {
    type: DataTypes.INTEGER(11)
    //required: true
  },
  market_id: {
    type: DataTypes.STRING(20)
    //required: true
    //indice PK
  },
  ask_member_id: {
    type: DataTypes.INTEGER(11)
    //required: true
    //indice PK
  },
  bid_member_id: {
    type: DataTypes.INTEGER(11)
    //required: true
    //indice PK
  },
  funds: {
    type: DataTypes.DECIMAL(32, 16)
    //required: true
  },
  created_at: {
    type: DataTypes.DATE
    //required: true
    //indice PK
  },
  updated_at: {
    type: DataTypes.DATETIME
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

/*

sequelize model:generate --name Trades --attributes price:decimal,volume:decimal,ask_id:integer,bid_id:integer,trend:integer,market_id:string,ask_member_id:integer,bid_member_id:integer,funds:decimal
  
npx sequelize-cli db:migrate




https://sequelize.org/master/class/lib/model.js~Model.html#updatevalues-options-promisearrayaffectedcount-affectedrows



*/
