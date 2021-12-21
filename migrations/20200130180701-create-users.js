'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
         default: "basic",                                                         //config acesscontrol-important
          enum: ["basic", "supervisor", "admin", "manager", "final_user"]          //config acesscontrol-important
      },
      accessToken: {
        type: Sequelize.STRING
      },
      passwordResetToken: {
        type: Sequelize.STRING
      },
      passwordResetExpires: {
        type: Sequelize.DATE
      },
      fullName: {
        type: Sequelize.STRING
      },
      country_code: {
        type: Sequelize.STRING
      },
      cellphone: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN
      },
      authyId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};