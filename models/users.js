// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Users = sequelize.define('Users', {
//     id: DataTypes.UUID,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     role: DataTypes.STRING,
//     accessToken: DataTypes.STRING,
//     passwordResetToken: DataTypes.STRING,
//     passwordResetExpires: DataTypes.DATE,
//     fullName: DataTypes.STRING,
//     country_code: DataTypes.STRING,
//     cellphone: DataTypes.STRING,
//     verified: DataTypes.BOOLEAN,
//     authyId: DataTypes.STRING
//   }, {});
//   Users.associate = function(models) {
//     // associations can be defined here
//   };
//   return Users;
// };




module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: DataTypes.UUID,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        accessToken: DataTypes.STRING,
        passwordResetToken: DataTypes.STRING,
        passwordResetExpires: DataTypes.DATE,
        fullName: DataTypes.STRING,
        country_code: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        verified: DataTypes.BOOLEAN,
        authyId: DataTypes.STRING
      }, {});
      Users.associate = function(models) {
        // associations can be defined here
      };
  return Users; //RETURN THE TABLE
};






// const User = sequelize.define("users", {
//   id: {
//       type: INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//   },
//   title: STRING(255),
//   price: {
//       type: DOUBLE,
//       defaultValue: 0.0
//   },
//   description: STRING(255)
// })