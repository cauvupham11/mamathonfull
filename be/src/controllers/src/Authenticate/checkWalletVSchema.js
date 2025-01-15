const Joi = require("joi");
const bech32 = require("bech32");

const validateBech32Address = (address) => {
  try {
    bech32.decode(address);
    return true;
  } catch (error) {
    return false;
  }
};

const connectWalletSchema = Joi.object({
  walletAddress: Joi.string()
    .custom((value, helpers) => {
      if (!validateBech32Address(value)) {
        return helpers.message(`"walletAddress" không phải là địa chỉ hợp lệ.`);
      }
      return value;
    })
    .required()
    .messages({
      "string.base": `"walletAddress" phải là một chuỗi ký tự.`,
      "string.empty": `"walletAddress" không được để trống.`,
      "any.required": `"walletAddress" là trường bắt buộc.`,
    }),
  signature: Joi.string().required().messages({
    "string.base": `"signature" phải là một chuỗi ký tự.`,
    "string.empty": `"signature" không được để trống.`,
    "any.required": `"signature" là trường bắt buộc.`,
  }),
});

module.exports = connectWalletSchema;
