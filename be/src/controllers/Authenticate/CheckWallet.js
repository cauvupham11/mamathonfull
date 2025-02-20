const { sendResponse, AppError } = require("../../helpers/utils");
const Wallet = require("../../models/wallet");
const User = require("../../models/user");
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
      const user = existingWallet.userId;
      await user.populate("house");

      const currentDate = new Date().toISOString().split("T")[0];

      const lastLoginDate = user.last_login
        ? user.last_login.toISOString().split("T")[0]
        : null;

      if (lastLoginDate !== currentDate) {
        user.last_login = new Date();

        return sendResponse(
          res,
          200,
          true,
          {
            wallet: existingWallet,
            user,
          },
          null,
          "Bạn chưa đăng nhập trong ngày hôm nay, không thể nhận vé."
        );
      } else {
        user.tickets += 1;
        await user.save();

        const token = jwt.sign(
          { userId: user._id, walletAddress },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        return sendResponse(
          res,
          200,
          true,
          {
            wallet: existingWallet,
            user,
            token,
          },
          null,
          "Ví đã được liên kết và bạn đã nhận 1 vé trong ngày hôm nay."
        );
      }
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
