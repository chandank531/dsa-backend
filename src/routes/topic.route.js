const router = require("express").Router();
const validate = require("../middlewares/Validate");
const topicController = require("../controllers/topic.controller");
const topicValidator = require("../validations/topic.validation");

router.post(
    "/create-topic",
    validate(topicValidator.addNewTopicSchema),
    topicController.createTopic
);

router.get(
    "/get-all-topics",
    topicController.getTopics
)

router.post(
    "/:topicId/problem",
    validate(topicValidator.addNewProblemSchema),
    topicController.createProblem
)

router.patch(
    "/problem/:problemId",
    topicController.updateProblemCompletionStatus
)

module.exports = router