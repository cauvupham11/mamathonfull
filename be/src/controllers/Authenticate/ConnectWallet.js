const { AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../models/user");
const Wallet = require("../../models/wallet");
const Pet = require("../../models/pet");
const validateWalletAddress = require("../blockChain/validateWalletAddress");

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
    // Kiểm tra tính hợp lệ của địa chỉ ví
    const isValid = await validateWalletAddress(walletAddress);
    if (!isValid) {
      throw new AppError(
        400,
        "Địa chỉ ví không hợp lệ hoặc không tồn tại",
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

    const newUser = new User({
      WalletAddress: walletAddress,
      created_at: new Date(),
      last_login: new Date(),
    });

    const user = await newUser.save();

    const offChainPets = await Pet.find({ OnChain: false });

    if (!offChainPets || offChainPets.length === 0) {
      throw new AppError(
        400,
        "Không có pet nào có sẵn để gán cho user mới",
        "Connect Wallet Error"
      );
    }

    const randomPetIndex = Math.floor(Math.random() * offChainPets.length);
    const assignedPet = offChainPets[randomPetIndex];

    user.TotalPets.push(assignedPet._id);
    await user.save();

    assignedPet.owner = user._id;
    await assignedPet.save();

    const newWallet = new Wallet({
      walletAddress,
      signature,
      userId: user._id,
      createdAt: new Date(),
    });

    await newWallet.save();

    // Populate thông tin pet từ user
    const populatedUser = await User.findById(user._id).populate("TotalPets");

    sendResponse(
      res,
      200,
      true,
      { wallet: newWallet, user: populatedUser, assignedPet },
      null,
      "Liên kết ví thành công và một pet đã được gán cho người dùng."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = connectWallet;
