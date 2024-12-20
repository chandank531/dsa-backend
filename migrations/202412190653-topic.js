'use strict';

const Sequelize = require('sequelize');
const tableName = 'topics';

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      topicTitle: {
        type: Sequelize.STRING
      },
      topicDescription: {
        type: Sequelize.STRING
      },
      level:  { type: Sequelize.ENUM('Easy', 'Medium', 'Hard'), allowNull: false },
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
  async down(queryInterface) {
    await queryInterface.dropTable(tableName);
  }
};