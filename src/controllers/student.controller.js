const CatchAsync = require('../utils/CatchAsync');
const studentService = require('../services/student.service');
const { ApiResponse, sendApiResponse } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const ServerError = require('../utils/ServerError');
const {getTransaction} = require('../config/sequelize');
const {encryptPassword, decryptPassword} = require('../utils/index');
const sessionManager = require('../middlewares/sessionManager');
const constants = require('../config/constants');

const registerStudent = CatchAsync(async (req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        let isStudentExist = await studentService.findOne({email});
        console.log(isStudentExist)
        if (isStudentExist) {
            return next(
                new ApiError({
                    message: constants.commonResponseMessages.DUPLICATE_EMAIL,
                    statusCode: constants.responseCodes.INVALID_PARAMS,
                    type: constants.apiErrorTypes.VALIDATION_ERROR,
                })
            );
        }
        const transaction = await getTransaction();
        const encryptedPassword = encryptPassword(password);
        const createStudentAccount = await studentService.create({
            ...req.body,
            password: encryptedPassword
        }, {
            transaction
        });
        transaction.commit();

        const authToken = await sessionManager.getAccessToken(req.params.userType, {
            id: createStudentAccount.id,
            email: createStudentAccount.email
        });

        const createdStudentAccountResponse = createStudentAccount.toJSON();
        createdStudentAccountResponse["accessToken"] = authToken.token;
        createdStudentAccountResponse["refreshToken"] = authToken.refreshToken;

        return sendApiResponse(
            res,
            new ApiResponse({
                data: createStudentAccount,
                statusCode: constants.responseCodes.CREATED,
            })
        );
    } catch (err) {
        console.log(err)
        return next(new ServerError(err, req, res));
    }
});

const studentLogin = CatchAsync(async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const student = await studentService.findOne({email});
        if (!student) {
            return next(
                new ApiError({
                    message: constants.commonResponseMessages.ACCOUNT_NOT_FOUND,
                    statusCode: constants.responseCodes.INVALID_PARAMS,
                    type: constants.apiErrorTypes.VALIDATION_ERROR,
                })
            );
        }
        const decryptedPassword = decryptPassword(password, student.password);
        if (decryptedPassword) {
            return next(
                new ApiError({
                    message: constants.commonResponseMessages.INVALID_CREDENTIALS,
                    statusCode: constants.responseCodes.INVALID_PARAMS,
                    type: constants.apiErrorTypes.VALIDATION_ERROR,
                })
            );
        }
        const authToken = await sessionManager.getAccessToken(req.params.userType, {
            id: student.id,
            email: student.email
        });    
        return sendApiResponse(
            res,
            new ApiResponse({
                statusCode: constants.responseCodes.SUCCESS,
                data: {
                    student,
                    accessToken: authToken.token,
                    refreshToken: authToken.refreshToken,
                }
            })
        );
    } catch (err) {
        console.log(err)
        return next(new ServerError(err, req, res));
    }
});

module.exports = {
    registerStudent,
    studentLogin
}