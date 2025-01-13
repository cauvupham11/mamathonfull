const { sendResponse, AppError } = require("../../helpers/utils");
const Wallet = require("../../models/wallet");
const jwt = require("jsonwebtoken");

const checkWallet = async (req, res, next) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      throw new AppError(400, "Thiếu địa chỉ ví", "Check Wallet Error");
    }

    const existingWallet = await Wallet.findOne({ walletAddress }).populate(
      "userId"
    );

    if (existingWallet) {
      const token = jwt.sign(
        { userId: existingWallet.userId._id, walletAddress },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return sendResponse(
        res,
        200,
        true,
        {
          wallet: existingWallet,
          user: existingWallet.userId,
          token,
        },
        null,
        "Ví đã được liên kết"
      );
    }

    sendResponse(
      res,
      200,
      true,
      null,
      null,
      "Ví chưa được liên kết, yêu cầu tạo tài khoản mới."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = checkWallet;
