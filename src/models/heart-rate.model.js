const Sequelize = require("sequelize");
const { Model, DataTypes } = require('sequelize')
const {connection} = require('../config/sequelize')

class HeartRateModel extends Model {}

HeartRateModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    from_date: {
        type: DataTypes.DATE
    },
    to_date: {
        type: DataTypes.DATE
    },
    low: {
        type: DataTypes.INTEGER
    },
    high: {
        type: DataTypes.INTEGER
    },
    patient_id: {
        type: Sequelize.STRING
    },
    orgId: {
        type: Sequelize.STRING
    }
},{
    sequelize: connection,
    modelName: "HeartRateModel",
    tableName: "HeartRates",
    alter: true,
    timestamps: true
})

module.exports = HeartRateModel;

