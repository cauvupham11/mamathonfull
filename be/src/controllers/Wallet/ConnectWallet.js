const Wallet = require("../../models/wallet"); // Model MongoDB
const { AppError, sendResponse } = require("../../helpers/utils"); // Helper để xử lý lỗi và response

// Controller: Kết nối ví
const ConnectWallet = async (req, res, next) => {
  try {
    const { walletAddress, signature } = req.body;

    // Kiểm tra nếu thiếu dữ liệu
    if (!walletAddress || !signature) {
      throw new AppError(
        400,
        "Thiếu địa chỉ ví hoặc chữ ký",
        "Connect Wallet Error"
      );
    }

    // Kiểm tra ví đã tồn tại trong database chưa
    const existingWallet = await Wallet.findOne({ walletAddress });
    if (existingWallet) {
      throw new AppError(400, "Ví đã được liên kết", "Connect Wallet Error");
    }

    // Tạo mới ví trong MongoDB
    const newWallet = new Wallet({
      walletAddress,
      signature,
      createdAt: new Date(),
    });

    await newWallet.save();

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { wallet: newWallet },
      null,
      "Liên kết ví thành công."
    );
  } catch (error) {
    next(error); // Chuyển lỗi sang middleware xử lý lỗi
  }
};

module.exports = ConnectWallet;
