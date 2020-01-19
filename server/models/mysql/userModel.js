//server/models/mysql/userModel.js

//const Mysqlconnect = require('../server');

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-acl-sequelize-test", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

const User = sequelize.define("users", {
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

User.sync({ force: true });