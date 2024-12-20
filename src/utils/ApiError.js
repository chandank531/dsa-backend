const constants = require("../config/constants");
const uuid = require("uuid");
const logger = require("../config/logger");
const messages = require("../config/messages");

class ApiError extends Error {
  constructor({
    statusCode,
    type,
    message,
    isOperational = true,
    stack = "",
    errors,
    data,
  }) {
    super(message);
    this.type = type || constants.apiErrorTypes.SERVER_ERROR;
    this.statusCode = statusCode || constants.responseCodes.COMMON_ERROR_CODE;
    this.isOperational = isOperational;
    this.errors = errors;
    try {
      this.message = messages.default[message] || message;
      this.messageCode = message;
      logger.error(JSON.stringify(this));
    } catch (error) {
      this.message = message || "Something went wrong!";
      logger.error(error);
    }
  }
}

module.exports = ApiError;
