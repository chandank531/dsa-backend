const Joi = require('joi');

const addNewTopicSchema = Joi.object({
  topicTitle: Joi.string().required(),
  topicDescription: Joi.string().optional(),
  level: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
});

const addNewProblemSchema = Joi.object({
  problemTitle: Joi.string().required(),
  youtubeLink: Joi.string().optional(),
  leetcodeLink: Joi.string().optional(),
  articleLink: Joi.string().optional()
});



module.exports = {
  addNewTopicSchema,
  addNewProblemSchema
};
