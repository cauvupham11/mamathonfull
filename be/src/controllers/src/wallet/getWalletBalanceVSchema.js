const Joi = require("joi");

const getWalletBalanceSchema = Joi.object({
  walletAddress: Joi.string()
    .pattern(/^celestia1[a-z0-9]{38}$/) // Định dạng ví Keplr của Celestia
    .required()
    .messages({
      "string.base": `"walletAddress" phải là một chuỗi ký tự.`,
      "string.pattern.base": `"walletAddress" không đúng định dạng ví Keplr hợp lệ (bắt đầu bằng 'celestia1' và dài 38 ký tự).`,
      "any.required": `"walletAddress" là trường bắt buộc.`,
    }),
});

const validateGetWalletBalance = (req, res, next) => {
  try {
    const { error } = getWalletBalanceSchema.validate(req.params, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      throw new Error(`Validation error: ${errorMessages}`);
    }

    next();
  } catch (error) {
    console.error("Validation error:", error.message);
    res.status(400).json({
      success: false,
      message: "Lỗi xác thực dữ liệu",
      error: error.message,
    });
  }
};

module.exports = validateGetWalletBalance;
