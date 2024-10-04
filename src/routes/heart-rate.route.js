const router = require("express").Router();
const heartRateController = require("../controllers/heart-rate.controller");
const heartRateValidator = require("../validations/heart-rate.validation");

router.post(
    "/heart-rate", 
    heartRateValidator.validateHeartRateData, 
    heartRateController.processHeartRate
);

module.exports = router