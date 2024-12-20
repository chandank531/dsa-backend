const studentModel = require("../models/student.model");
const Model = studentModel;

class studentService {
    create = async (body,options) => {
        return Model.create(body, options);
    }

    findOne = async (filter) => {
        return Model.findOne({
            where: filter
        });
    }

    findAll = async (filter) => {
        return Model.findAll({
            where: filter
        });
    }
}

module.exports = new studentService();