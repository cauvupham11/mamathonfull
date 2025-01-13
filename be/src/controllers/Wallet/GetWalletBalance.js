const Wallet = require("../../models/wallet");
const User = require("../../models/user");

const { sendResponse, AppError } = require("../../helpers/utils");
const getBalanceFromNode = require("../blockChain/getBalanceFromBlockChain");

const getWalletBalance = async (req, res, next) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      throw new AppError(
        400,
        "Thiếu địa chỉ ví để kiểm tra số dư",
        "Get Wallet Balance Error"
      );
    }

    const balance = await getBalanceFromNode(walletAddress);

    if (balance === null || balance === undefined) {
      throw new AppError(
        500,
        "Không thể lấy số dư từ RPC",
        "Get Wallet Balance Error"
      );
    }
    const wallet = await Wallet.findOneAndUpdate(
      { walletAddress },
      { balance },
      { new: true }
    );

    if (!wallet) {
      throw new AppError(404, "Không tìm thấy ví", "Get Wallet Balance Error");
    }

    sendResponse(
      res,
      200,
      true,
      { walletAddress, balance },
      null,
      "Lấy số dư ví thành công"
    );
  } catch (error) {
    console.error("Lỗi khi lấy số dư ví:", error.message);
    next(error);
  }
};

module.exports = getWalletBalance;
