const Joi = require("joi");

// Định nghĩa schema
const addPetSchema = Joi.object({
  Name: Joi.string().trim().required().messages({
    "string.base": `"Name" phải là một chuỗi ký tự.`,
    "string.empty": `"Name" không được để trống.`,
    "any.required": `"Name" là trường bắt buộc.`,
  }),
  Ability: Joi.string().trim().optional().messages({
    "string.base": `"Ability" phải là một chuỗi ký tự.`,
  }),
  model3D: Joi.string().trim().required().messages({
    "string.base": `"model3D" phải là một chuỗi ký tự.`,
    "string.empty": `"model3D" không được để trống.`,
    "any.required": `"model3D" là trường bắt buộc.`,
  }),
});

module.exports = addPetSchema;
