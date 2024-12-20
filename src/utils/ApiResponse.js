const constants = require('../config/constants');

class ApiResponse {
    constructor({
        data,
        meta,
        success,
        statusCode,
        message,
        language,
        
    }) {
        this.data = data || null;
        this.meta = meta || null;
        this.success = success != undefined ? success : true;
        this.statusCode = statusCode || constants.responseCodes.SUCCESS || 200;
        this.language = language;
        this.message = message || 'Execution Successful.';
    }
}

module.exports.ApiResponse = ApiResponse;

module.exports.sendApiResponse = function (res, apiReponse) {
    res.status(apiReponse.statusCode).json(apiReponse);
}