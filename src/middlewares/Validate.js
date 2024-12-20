const Joi = require('joi');
const pick = require('../utils/pick');
const constants = require('../config/constants');
const ApiError = require('../utils/ApiError');
const ServerError = require('../utils/ServerError');
const messages = require('../config/constants/messages');

const validate = (schema) => async (req, res, next) => {
    try {
        const validSchema = pick(schema, ['params', 'query', 'body']);
        const object = pick(req, Object.keys(validSchema));
        const {
            value,
            error
        } = Joi.compile(validSchema)
            .prefs({
                errors: {
                    label: 'key'
                },
                abortEarly: false
            })
            .validate(object);

        let language = req.headers['language'] || constants.defaultLanguage;

        if (error) {
            const errorMessage = error.details.map((detail) => {
                return {
                    key: detail.context.key,
                    error: detail.message
                }
            });

            const errorLanguage = language ? language : constants.defaultLanguage;
            console.log('============errorLanguage=============',errorLanguage)

            return next(new ApiError({
                message: messages[errorLanguage][constants.commonResponseMessages.INVALID_PARAMS],
                errors: errorMessage,
                statusCode: constants.responseCodes.INVALID_PARAMS,
                type: constants.apiErrorTypes.VALIDATION_ERROR
            }));
        }
        Object.assign(req, value);
        return next();
    } catch (error) {
        console.error(error);
        return next(new ServerError(error, req, res));
    }
};

module.exports = validate;
