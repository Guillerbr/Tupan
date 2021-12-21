//server/models/mysql/userModel.js

//const Mysqlconnect = require('../server');
'use strict';

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



const User = sequelize.define("users", {

  /*
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  */
  email: {
    type: Sequelize.STRING,
    required: true,
    trim: true
  },
  password: {
    type: Sequelize.STRING,
    required: true
  },
  role: {
    type: Sequelize.STRING,
    default: "basic", //config acesscontrol-important
    enum: ["basic", "supervisor", "admin", "manager", "final_user"] //config acesscontrol-important
  },
  accessToken: {
    type: Sequelize.STRING
  },
  passwordResetToken: {
    type: Sequelize.STRING,
    select: false
  },
  passwordResetExpires: {
    type: Sequelize.DATE,
    select: false
  },
  fullName: {
    type: Sequelize.STRING
    //required: true,
  },
  country_code: {
    type: Sequelize.STRING
    //required: true,
  },
  cellphone: {
    type: Sequelize.STRING
    //required: true,
  },
  verified: {
    type: Sequelize.BOOLEAN,
    default: false
  },
  authyId: Sequelize.STRING,
  email: {
    type: Sequelize.STRING
    //required: true,
    // unique: true
  }
});


//force create new table
//User.sync({ force: true });


module.exports = User;



/*

sequelize model:generate --name Users --attributes email:string,password:string,role:string,accessToken:string,passwordResetToken:string,passwordResetExpires:date,fullName:string,country_code:string,cellphone:string,verified:boolean,authyId:string
  
npx sequelize-cli db:migrate




https://sequelize.org/master/class/lib/model.js~Model.html#updatevalues-options-promisearrayaffectedcount-affectedrows




*/