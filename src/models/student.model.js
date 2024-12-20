const Sequelize = require("sequelize");
const { Model, DataTypes } = require('sequelize')
const {connection} = require('../config/sequelize')

class StudentModel extends Model {}

StudentModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},{
    sequelize: connection,
    modelName: "studentModel",
    tableName: "students",
    alter: true,
    timestamps: true
})

module.exports = StudentModel;

