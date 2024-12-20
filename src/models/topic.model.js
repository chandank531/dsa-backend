const Sequelize = require("sequelize");
const { Model, DataTypes } = require('sequelize')
const {connection} = require('../config/sequelize')

class TopicModel extends Model {}

TopicModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    topicTitle: {
        type: DataTypes.STRING
    },
    topicDescription: {
        type: DataTypes.STRING
    },
    level:  { 
        type: DataTypes.ENUM('Easy', 'Medium', 'Hard'), 
        allowNull: false 
    }
},{
    sequelize: connection,
    modelName: "topicModel",
    tableName: "topics",
    alter: true,
    timestamps: true
})

module.exports = TopicModel;

