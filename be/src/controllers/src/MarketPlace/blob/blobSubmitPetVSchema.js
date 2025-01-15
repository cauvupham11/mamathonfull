const Joi = require("joi");
const bech32 = require("bech32");

// Hàm kiểm tra địa chỉ Bech32
const validateBech32Address = (address) => {
  try {
    bech32.decode(address);
    return true;
  } catch (error) {
    return false;
  }
};

// Định nghĩa schema
const blobSubmitPetSchema = Joi.object({
  namespace: Joi.string().required().messages({
    "string.base": `"namespace" phải là một chuỗi ký tự.`,
    "string.empty": `"namespace" không được để trống.`,
    "any.required": `"namespace" là trường bắt buộc.`,
  }),
  data: Joi.string().required().messages({
    "string.base": `"data" phải là một chuỗi ký tự.`,
    "string.empty": `"data" không được để trống.`,
    "any.required": `"data" là trường bắt buộc.`,
  }),
  gas_price: Joi.number().min(0).optional().messages({
    "number.base": `"gas_price" phải là một số.`,
    "number.min": `"gas_price" không được nhỏ hơn 0.`,
  }),
  gas: Joi.number().min(0).optional().messages({
    "number.base": `"gas" phải là một số.`,
    "number.min": `"gas" không được nhỏ hơn 0.`,
  }),
  key_name: Joi.string().optional().messages({
    "string.base": `"key_name" phải là một chuỗi ký tự.`,
  }),
  signer_address: Joi.string()
    .custom((value, helpers) => {
      if (!validateBech32Address(value)) {
        return helpers.message(`"signer_address" không phải là địa chỉ Bech32 hợp lệ.`);
      }
      return value;
    })
    .required()
    .messages({
      "string.base": `"signer_address" phải là một chuỗi ký tự.`,
      "string.empty": `"signer_address" không được để trống.`,
      "any.required": `"signer_address" là trường bắt buộc.`,
    }),
  fee_granter_address: Joi.string()
    .custom((value, helpers) => {
      if (!validateBech32Address(value)) {
        return helpers.message(`"fee_granter_address" không phải là địa chỉ Bech32 hợp lệ.`);
      }
      return value;
    })
    .optional()
    .messages({
      "string.base": `"fee_granter_address" phải là một chuỗi ký tự.`,
    }),
});

module.exports = blobSubmitPetSchema;
