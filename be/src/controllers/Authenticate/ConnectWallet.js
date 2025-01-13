const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../models/user");
const Wallet = require("../../models/wallet");

const connectWallet = async (req, res, next) => {
  try {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature) {
      throw new AppError(
        400,
        "Thiếu địa chỉ ví hoặc chữ ký",
        "Connect Wallet Error"
      );
    }

    const existingWallet = await Wallet.findOne({ walletAddress });
    if (existingWallet) {
      throw new AppError(
        400,
        "Ví đã được liên kết trước đó",
        "Connect Wallet Error"
      );
    }

    const hashedSignature = await bcrypt.hash(signature, 10);

    const newUser = new User({
      WalletAddress: walletAddress,
      created_at: new Date(),
      last_login: new Date(),
    });

    const user = await newUser.save();

    const newWallet = new Wallet({
      walletAddress,
      signature: hashedSignature,
      userId: user._id,
      createdAt: new Date(),
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10h",
    });

    await newWallet.save();

    sendResponse(
      res,
      200,
      true,
      { token, wallet: newWallet, user },
      null,
      "Liên kết ví thành công và người dùng đã được tạo."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = connectWallet;
