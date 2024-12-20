const { DUPLICATE_EMAIL } = require("./constants/commonResponseMessages");

module.exports = {
    default: {
        400: "Bad request",
        401: "Unauthorized",
        404: "Not found",
        500: "Internal server error"
    }
}