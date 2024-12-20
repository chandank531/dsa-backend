const Sequelize = require("sequelize");
const { Model, DataTypes } = require('sequelize')
const {connection} = require('../config/sequelize')
const topicModel = require('./topic.model');

class ProblemModel extends Model {}

ProblemModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    problemTitle: {
        type: DataTypes.STRING
    },
    youtubeLink: {
        type: DataTypes.STRING
    },
    leetcodeLink: {
        type: DataTypes.STRING
    },
    articleLink: {
        type: DataTypes.STRING
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    topicId: {
        type: DataTypes.INTEGER,
        references: {
            model: topicModel,
            key: 'id',
        },
        onDelete: 'CASCADE',
    }
},{
    sequelize: connection,
    modelName: "problemModel",
    tableName: "problems",
    alter: true,
    timestamps: true
})

topicModel.hasMany(ProblemModel, { foreignKey: 'topicId', as: 'problems' });
ProblemModel.belongsTo(topicModel, { foreignKey: 'topicId', as: 'topic' });

module.exports = ProblemModel;

