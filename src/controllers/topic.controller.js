const CatchAsync = require('../utils/CatchAsync');
const { ApiResponse, sendApiResponse } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const ServerError = require('../utils/ServerError');
const {getTransaction} = require('../config/sequelize');
const {encryptPassword, decryptPassword} = require('../utils/index');
const sessionManager = require('../middlewares/sessionManager');
const constants = require('../config/constants');
const topicService = require('../services/topic.service');

const createTopic = CatchAsync(async(req,res,next) => {
    try {
        const {topicTitle, topicDescription, level} = req.body;
        const isTopicExist = await topicService.findOneTopic({topicTitle});
        if (isTopicExist) {
            return next(
                new ApiError({
                    message: constants.commonResponseMessages.DUPLICATE_TOPIC_TITLE,
                    statusCode: constants.responseCodes.INVALID_PARAMS,
                    type: constants.apiErrorTypes.VALIDATION_ERROR,
                })
            )
        }
        const createTopic = await topicService.create({topicTitle, topicDescription, level});
        return sendApiResponse(
            res,
            new ApiResponse({
                data: createTopic,
                statusCode: constants.responseCodes.CREATED,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ServerError(error, req, res));
    }
})

const getTopics = CatchAsync(async(req, res, next) => {
    try {
        const topics = await topicService.findAllTopics();
        return sendApiResponse(
            res,
            new ApiResponse({
                data: topics,
                statusCode: constants.responseCodes.SUCCESS,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ServerError(error, req, res));
    }
});


const createProblem = CatchAsync(async(req,res,next) => {
    try {
        const {problemTitle,youtubeLink, leetcodeLink, articleLink} = req.body;
        const isTopicExist = await topicService.findOneTopic({id:req.params.topicId});
        if(!isTopicExist) {
            return next(
                new ApiError({
                    message: constants.commonResponseMessages.TOPIC_NOT_FOUND,
                    statusCode: constants.responseCodes.INVALID_PARAMS,
                    type: constants.apiErrorTypes.VALIDATION_ERROR,
                })
            )
        }
        const isProblemExist = await topicService.findOneProblem({problemTitle});
        if (isProblemExist) {
            return next(
                new ApiError({
                    message: constants.commonResponseMessages.DUPLICATE_PROBLEM_TITLE,
                    statusCode: constants.responseCodes.INVALID_PARAMS,
                    type: constants.apiErrorTypes.VALIDATION_ERROR,
                })
            )
        }
        const problemData = { ...req.body, topicId: req.params.topicId };
        const createProblem = await topicService.createProblem(problemData);
        return sendApiResponse(
            res,
            new ApiResponse({
                data: createProblem,
                statusCode: constants.responseCodes.SUCCESS,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ServerError(error, req, res));
    }
})

const updateProblemCompletionStatus = CatchAsync(async(req,res,next) => {
    try {
        const {isCompleted} = req.body;
        const updateProblem = await topicService.updateProblem({isCompleted},{id: req.params.problemId});
        return sendApiResponse(
            res,
            new ApiResponse({
                data: updateProblem,
                statusCode: constants.responseCodes.SUCCESS,
            })
        );
    } catch (error) {
        console.log(error);
        return next(new ServerError(error, req, res));
    }
})

module.exports = {
    createTopic,
    getTopics,
    createProblem,
    updateProblemCompletionStatus
}