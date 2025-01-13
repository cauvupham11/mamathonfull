const User = require("../../models/user");
const Wallet = require("../../models/wallet");
const getBalanceFromNode = require("../blockChain/getBalanceFromBlockChain");

const updateUserBalance = async (userId) => {
  try {
    const user = await User.findById(userId).populate("WalletAddress");
    if (!user || !user.WalletAddress) {
      throw new Error("Không tìm thấy người dùng hoặc ví liên kết");
    }

    const wallet = await Wallet.findById(user.WalletAddress);
    if (!wallet) {
      throw new Error("Không tìm thấy ví");
    }

    const balance = await getBalanceFromNode(wallet.walletAddress);
    user.Balance = balance;
    await user.save();

    return balance;
  } catch (error) {
    console.error("Lỗi khi cập nhật số dư người dùng:", error);
    throw error;
  }
};
module.exports = updateUserBalance;
