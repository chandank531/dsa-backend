const constants = require("../config/constants");
const config = require("../config/envConfig");
const Jwt = require("jsonwebtoken");
const CatchAsync = require("../utils/CatchAsync");
const ApiError = require("../utils/ApiError");
const studentService = require("../services/student.service");

const errorMessages = {
  userTypeInvalid: {
    message: "User type must be string or array",
    statusCode: constants.responseCodes.AUTHENTICATION_ERROR,
    type: constants.apiErrorTypes.VALIDATION_ERROR,
  },
  authenticationError: {
    message: constants.commonResponseMessages.AUTHENTICATION_ERROR,
    statusCode: constants.responseCodes.AUTHENTICATION_ERROR,
    type: constants.apiErrorTypes.VALIDATION_ERROR,
    data: {
      devMessage: "Make sure that you have passed a valid token.",
    },
  },
  studentNotExists: {
    message: "Student not exists. Make sure that you have passed a valid student token.",
    statusCode: constants.responseCodes.AUTHENTICATION_ERROR,
    type: constants.apiErrorTypes.VALIDATION_ERROR,
    data: {
      devMessage: "Student not exists. Make sure that you have passed a valid student token.",
    },
  },
};

async function createAccessToken(payload, time, userType) {
  const expireTime = {
    expiresIn: time || config.jwt.authTokenExpiry,
  };
  return Jwt.sign({
      ...payload,
      userType: userType || "student",
    },
    config.jwt.secretKey,
    expireTime
  );
}

async function getAccessToken(userType, payload) {
  const token = await createAccessToken({
      ...payload,
      type: "access-token"
    },
    "1d",
    userType || "student"
  );
  const refreshToken = await createAccessToken({
      ...payload,
      type: "refresh-token"
    },
    "7d",
    userType
  );
  return {
    token,
    refreshToken
  };
}

const authenticateAccessToken = (userType) =>
  CatchAsync(async function (req, res, next) {
    try {
      if (typeof userType === "string" || Array.isArray(userType)) {
        userType = typeof userType === "string" ? [userType] : userType;
      } else {
        return next(new ApiError(errorMessages.userTypeInvalid));
      }

      console.log("userType array=>", userType);

      const tokenString =
        req.headers["access-token"] ||
        req.headers["api-token"] ||
        req.query["access-token"];

      if (!tokenString) {
        return next(new ApiError(errorMessages.authenticationError));
      }

      const decodedData = Jwt.verify(tokenString, config.jwt.secretKey);
      console.log("==========decodedData========", decodedData);

      if (!decodedData) {
        return next(new ApiError(errorMessages.authenticationError));
      }

      switch (decodedData.userType) {
        case constants.ACCOUNT_TYPES.STUDENT:
          const studentId = decodedData.id;
          let student = await studentService.findOne({
            id: studentId,
          });
          student = student ? student.toJSON() : null;

          if (!student) {
            return next(new ApiError(errorMessages.studentNotExists));
          }

          req.studentId = decodedData.id;
          req.student = student;
          break;

        default:
          return next(new ApiError(errorMessages.authenticationError));
      }
    } catch (error) {
      console.log("authenticateAccessToken error:- ", error);

      return next(
        new ApiError({
          message: error.message == "jwt expired" ?
            "access_token_expired" : constants.commonResponseMessages.AUTHENTICATION_ERROR,
          statusCode: constants.responseCodes.AUTHENTICATION_ERROR,
          type: constants.apiErrorTypes.VALIDATION_ERROR,
          data: {
            devMessage: "Make sure that you have passed a valid token.",
          },
        })
      );
    }
    next();
  });

const authenticateRefreshToken = (userType) =>
  CatchAsync(async function (req, res, next) {
    try {
      if (typeof userType === "string" || Array.isArray(userType)) {
        userType = typeof userType === "string" ? [userType] : userType;
      } else {
        return next(new ApiError(errorMessages.userTypeInvalid));
      }

      const tokenString = req.headers["refresh-token"];
      if (!tokenString) {
        return next(new ApiError(errorMessages.authenticationError));
      }

      const decodedData = Jwt.verify(tokenString, config.jwt.secretKey);
      console.log("==========decodedData========", decodedData);
      if (!decodedData) {
        return next(new ApiError(errorMessages.authenticationError));
      }

      switch (decodedData.userType) {
        case constants.ACCOUNT_TYPES.STUDENT:
          const studentId = decodedData.id;
          let student = await studentService.findOne({
            id: studentId,
          });
          student = student ? student.toJSON() : null;

          if (!student) {
            return next(new ApiError(errorMessages.studentNotExists));
          }

          if (student.isBlocked) {
            return next(new ApiError(errorMessages.studentBlocked));
          }

          req.studentId = decodedData.id;
          req.student = student;
          break;

        default:
          return next(new ApiError(errorMessages.authenticationError));
      }
    } catch (error) {
      console.log("authenticateRefreshToken error:- ", error);
      return next(
        new ApiError({
          message: error.message == "jwt expired" ?
            "refresh_token_expired" : constants.commonResponseMessages.AUTHENTICATION_ERROR,
          statusCode: constants.responseCodes.AUTHENTICATION_ERROR,
          type: constants.apiErrorTypes.VALIDATION_ERROR,
          data: {
            devMessage: "Make sure that you have passed a valid token.",
          },
        })
      );
    }
    next();
  });

module.exports = {
  createAccessToken,
  getAccessToken,
  authenticateAccessToken,
  authenticateRefreshToken,
};