const topicModel = require("../models/topic.model");
const problemModel = require("../models/problem.model");

class topicService {
    create = async (body,options) => {
        return topicModel.create(body, options);
    }

    findOneTopic = async (filter) => {
        return topicModel.findOne(
            { 
                where: filter,
                include: [
                    { 
                        model: problemModel,
                        as: 'problems' 
                    }
                ] 
            }
        );
    }

    findOneProblem = async (filter) => {
        return problemModel.findOne(
            { 
                where: filter,
                include: [
                    { 
                        model: topicModel,
                        as: 'topic' 
                    }
                ] 
            }
        );
    }

    findAllTopics = async (filter) => {
        const topics = await topicModel.findAll({
            where: filter,
            include: [
                { 
                    model: problemModel,
                    as: 'problems' 
                }
            ]
        });
    
        const topicsWithCompletionStatus = topics.map(topic => {
            const allProblemsCompleted = topic.problems.every(problem => problem.isCompleted === true);
    
            return {
                ...topic.dataValues,  
                isCompleted: allProblemsCompleted,  
            };
        });
    
        return topicsWithCompletionStatus;
    }
    
    

    createProblem = async (body, options) => {
        console.log(body);
        return problemModel.create(body, options);
    }

    updateProblem = (body, filter, options) => {
        console.log('=======updateByFilter=======',body, filter, options)
        return problemModel.update(body, {
            where: filter,
            ...options,
            returning: true
        },
        );
    }
}

module.exports = new topicService();