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
    type: Sequelize.DECIMAL,
    //required: true,
    trim: true
  },
  volume: {
    type: Sequelize.DECIMAL,
    //required: true
  },
  ask_id: {
    type: Sequelize.INTEGER
    //required: true
    //indice PK
  },
  bid_id: {
    type: Sequelize.INTEGER
    //required: true
    //indice PK
  },
  trend: {
    type: Sequelize.INTEGER
    //required: true
  },
  market_id: {
    type: Sequelize.STRING
    //required: true
    //indice PK
  },
  ask_member_id: {
    type: Sequelize.INTEGER
    //required: true
    //indice PK
  },
  bid_member_id: {
    type: Sequelize.INTEGER
    //required: true
    //indice PK
  },
  funds: {
    type: Sequelize.DECIMAL
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
//User.sync({ force: true });

module.exports = Trades;

/*

sequelize model:generate --name Trades --attributes price:decimal,volume:decimal,ask_id:integer,bid_id:integer,trend:integer,market_id:string,ask_member_id:integer,bid_member_id:integer,funds:decimal
  
npx sequelize-cli db:migrate




https://sequelize.org/master/class/lib/model.js~Model.html#updatevalues-options-promisearrayaffectedcount-affectedrows



*/
