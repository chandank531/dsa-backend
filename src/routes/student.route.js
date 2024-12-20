const router = require("express").Router();
const studentController = require("../controllers/student.controller");
const studentValidator = require("../validations/student.validation");
const validate = require("../middlewares/Validate");
router.post(
    "/register",
    validate(studentValidator.registerStudentSchema),
    studentController.registerStudent
);

router.post(
    "/login",
    validate(studentValidator.loginStudentSchema),
    studentController.studentLogin
)

module.exports = router