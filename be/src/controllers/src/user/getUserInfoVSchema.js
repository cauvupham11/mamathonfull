const Joi = require("joi");

const getUserInfoVSchema = Joi.object({
  walletAddress: Joi.string().required().messages({
    "string.base": `"walletAddress" should be a type of 'text'`,
    "string.empty": `"walletAddress" cannot be an empty field`,
    "any.required": `"walletAddress" is a required field`,
  }),
});

module.exports = getUserInfoVSchema;
