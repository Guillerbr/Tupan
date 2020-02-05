'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bid: {
        type: Sequelize.STRING
      },
      ask: {
        type: Sequelize.STRING
      },
      market_id: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      volume: {
        type: Sequelize.DECIMAL
      },
      origin_volume: {
        type: Sequelize.DECIMAL
      },
      fee: {
        type: Sequelize.DECIMAL
      },
      state: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      member_id: {
        type: Sequelize.INTEGER
      },
      ord_type: {
        type: Sequelize.STRING
      },
      locked: {
        type: Sequelize.DECIMAL
      },
      origin_locked: {
        type: Sequelize.DECIMAL
      },
      funds_received: {
        type: Sequelize.DECIMAL
      },
      trades_count: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Orders');
  }
};