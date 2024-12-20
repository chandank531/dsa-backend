const httpStatus = require("http-status");
const {
    http
} = require("../logger");

module.exports = {
    SERVICE_ERROR: httpStatus.INTERNAL_SERVER_ERROR,
    COMMON_ERROR_CODE: httpStatus.INTERNAL_SERVER_ERROR,
    SOMETHING_WENT_WRONG: httpStatus.INTERNAL_SERVER_ERROR,
    INVALID_PARAMS: httpStatus.BAD_REQUEST,
    AUTHENTICATION_ERROR: httpStatus.UNAUTHORIZED,
    CREATED: httpStatus.CREATED,
    SUCCESS: httpStatus.SUCCESS,
    UPDATED: httpStatus.UPDATED,
    DELETED: httpStatus.DELETED
};