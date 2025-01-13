const User = require("../../models/user");
const Wallet = require("../../models/wallet");
const { sendResponse, AppError } = require("../../helpers/utils");

const getUserInfo = async (req, res, next) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      throw new AppError(400, "Thiếu địa chỉ ví", "Get User Info Error");
    }

    // Lấy thông tin ví từ Wallet
    const wallet = await Wallet.findOne({ walletAddress });
    if (!wallet) {
      throw new AppError(404, "Không tìm thấy ví", "Get User Info Error");
    }

    // Lấy thông tin user liên kết với ví
    const user = await User.findOne({ WalletAddress: walletAddress });
    if (!user) {
      throw new AppError(
        404,
        "Không tìm thấy người dùng",
        "Get User Info Error"
      );
    }

    sendResponse(
      res,
      200,
      true,
      {
        Name: user.Name,
        WalletAddress: user.WalletAddress,
        Balance: wallet.balance, // Lấy số dư từ Wallet
        TotalPets: user.TotalPets,
        LevelHouse: user.LevelHouse,
      },
      null,
      "Lấy thông tin người dùng thành công"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getUserInfo;
