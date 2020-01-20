//server/models/mysql/userModel.js

//const Mysqlconnect = require('../server');

const Sequelize = require("sequelize");

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

//User.sync({ force: true });

module.exports = User;



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