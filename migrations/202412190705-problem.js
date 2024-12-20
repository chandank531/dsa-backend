'use strict';

const Sequelize = require('sequelize');
const tableName = 'problems';

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      problemTitle: {
        type: Sequelize.STRING
      },
      youtubeLink: {
        type: Sequelize.STRING,
      },
      leetcodeLink: {
        type: Sequelize.STRING,
      },
      articleLink: {
        type: Sequelize.STRING,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      topicId: {
        type: Sequelize.INTEGER,
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
  async down(queryInterface) {
    await queryInterface.dropTable(tableName);
  }
};