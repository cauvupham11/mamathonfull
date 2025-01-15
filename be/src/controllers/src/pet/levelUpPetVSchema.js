const Joi = require("joi");

// Định nghĩa schema cho params
const levelUpPetSchemaParams = Joi.object({
  petId: Joi.string()
    .trim()
    .regex(/^[a-fA-F0-9]{24}$/) // Định dạng ObjectId của MongoDB (24 ký tự hex)
    .required()
    .messages({
      "string.base": `"petId" phải là một chuỗi ký tự.`,
      "string.empty": `"petId" không được để trống.`,
      "string.pattern.base": `"petId" không đúng định dạng ObjectId hợp lệ.`,
      "any.required": `"petId" là trường bắt buộc.`,
    }),
});

// Định nghĩa schema cho body
const levelUpPetSchemaBody = Joi.object({
  confirm: Joi.boolean().optional().messages({
    "boolean.base": `"confirm" phải là giá trị true hoặc false.`,
  }),
});

module.exports = {
  levelUpPetSchemaParams,
  levelUpPetSchemaBody,
};
