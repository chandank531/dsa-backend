'use strict';

const Sequelize = require('sequelize');
const tableName = 'HeartRates';

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from_date: {
        type: Sequelize.DATE
      },
      to_date: {
        type: Sequelize.DATE
      },
      low: {
        type: Sequelize.INTEGER
      },
      high: {
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.STRING
      },
      orgId: {
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
  async down(queryInterface) {
    await queryInterface.dropTable(tableName);
  }
};