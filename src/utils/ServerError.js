const ApiError = require("./ApiError");
const Joi = require('joi');
const uuid = require('uuid');
const constants = require('../config/constants');
const logger = require("../config/logger");
const messages = require('../config/constants/messages');

class ServerError {
    constructor(err, req, res) {
        if (err == undefined || err == null) {
            throw new Error("err is required");
        }
        if (req == undefined || req == null) {
            throw new Error("req is required");
        }
        if (res == undefined || res == null) {
            throw new Error("res is required");
        }
        const language = req.headers['language'] || constants.defaultLanguage;
        try {
            const traceId = uuid.v4();
            const errorObject = {
                traceId,
                statusCode: constants.responseCodes.SOMETHING_WENT_WRONG,
                message: messages[language][constants.commonResponseMessages.SOMETHING_WENT_WRONG]
            }
            console.error(err);
            const traceError = {
                ...errorObject,
                path: req.path,
                stack: err.stack,
                reqHeaders: req.headers,
                reqBody: req.body,
                reqParams: req.params,
                reqQuery: req.query,
            }
            logger.error(JSON.stringify(traceError));
            this.traceId = errorObject.traceId;
            this.statusCode = errorObject.statusCode;
            this.path = req.path;
            this.message = errorObject.message;
            if (process.env.DEV_ENV === "local") {
                this.devMessage = err.message;
                this.stack = err.stack;
            }
        } catch (error) {
            console.log(error);
            const traceId = uuid.v4();
            logger.error(JSON.stringify({
                statusCode: constants.responseCodes.SOMETHING_WENT_WRONG,
                traceId: traceId,
                message: err.message,
                stack: err.stack,
                reqHeaders: req.headers,
                reqBody: req.body,
                reqParams: req.params,
                reqQuery: req.query
            }))
            res.status(constants.responseCodes.SOMETHING_WENT_WRONG).json({
                traceId: traceId,
                statusCode: constants.responseCodes.SOMETHING_WENT_WRONG,
                message: error.message
            });
        }
    }
}

module.exports = ServerError;