const { AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../models/user");

const buyTicket = async (req, res, next) => {
  try {
    const { userID, amount } = req.body;

    // Kiểm tra số tiền người dùng gửi lên có hợp lệ không
    if (!amount || amount < 15) {
      throw new AppError(
        "Amount must be at least 15 fiat to buy 1 ticket",
        400
      );
    }

    // Tính số vé người dùng sẽ nhận
    const tickets = Math.floor(amount / 15);

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userID);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Kiểm tra người dùng có đủ tiền fiat trong tài khoản không
    if (user.balanceFiat < amount) {
      throw new AppError("Insufficient balanceFiat", 400);
    }

    // Giảm số dư fiat của người dùng
    user.balanceFiat -= amount;

    // Cập nhật số vé cho người dùng
    user.tickets += tickets;
    await user.save();

    sendResponse(
      res,
      200,
      true,
      { user },
      null,
      `You have successfully bought ${tickets} ticket(s)`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = buyTicket;
