'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
      },
      volume: {
        type: Sequelize.DECIMAL
      },
      ask_id: {
        type: Sequelize.INTEGER
      },
      bid_id: {
        type: Sequelize.INTEGER
      },
      trend: {
        type: Sequelize.INTEGER
      },
      market_id: {
        type: Sequelize.STRING
      },
      ask_member_id: {
        type: Sequelize.INTEGER
      },
      bid_member_id: {
        type: Sequelize.INTEGER
      },
      funds: {
        type: Sequelize.DECIMAL
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
    return queryInterface.dropTable('Trades');
  }
};

/*

sequelize model:generate --name Users --attributes email:string,password:string,role:string,
accessToken:string,passwordResetToken:string,passwordResetExpires:date,fullName:string,country_code:string,
cellphone:string,verified:boolean,authyId:string
  
npx sequelize-cli db:migrate

*/