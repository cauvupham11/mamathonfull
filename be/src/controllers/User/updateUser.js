const axios = require("axios");
const User = require("../../models/user");
const { AppError, sendResponse } = require("../../helpers/utils");

const deposit = async (req, res, next) => {
  try {
    const { userID, amount, currency } = req.body;

    // Kiểm tra số tiền và loại tiền tệ đầu vào
    if (!amount || amount <= 0) {
      throw new AppError("Invalid amount", 400);
    }
    if (!currency) {
      throw new AppError("Currency type is required", 400);
    }

    // API endpoint chuyển đổi tiền tệ từ currency sang USD
    const convertApiUrl = `https://v6.exchangerate-api.com/v6/3307c168b3c165d72de6a7ba/latest/${currency}`;

    let amountInUSD;
    try {
      // Gọi API để lấy tỷ giá chuyển đổi
      const response = await axios.get(convertApiUrl);
      if (response.data && response.data.conversion_rates.USD) {
        const exchangeRate = response.data.conversion_rates.USD;
        amountInUSD = amount * exchangeRate;
      } else {
        throw new AppError("Unable to get conversion rate", 400);
      }
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      throw new AppError("Error fetching conversion rate from API", 500);
    }

    // Tìm người dùng theo userID
    const user = await User.findById(userID);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Cập nhật số dư balanceFiat cho người dùng
    user.balanceFiat += amountInUSD;
    await user.save();

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { user },
      null,
      `User's balanceFiat updated successfully with ${amountInUSD} USD`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = deposit;
