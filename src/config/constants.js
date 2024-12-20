const defaultLanguage = "en";

const responseCodes = require("./constants/responseCodes");
const commonResponseMessages = require("./constants/commonResponseMessages");

const apiErrorTypes = {
  PAGE_NOT_FOUND: "PAGE_NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
};

const ACCOUNT_TYPES = {
  STUDENT: "student"
};

module.exports = {
  defaultLanguage,
  responseCodes,
  apiErrorTypes,
  commonResponseMessages
};
