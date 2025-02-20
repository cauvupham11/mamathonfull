const Pet = require("../../models/pet");
const House = require("../../models/house");
const User = require("../../models/user");
const { AppError, sendResponse } = require("../../helpers/utils");

const feedPet = async (req, res, next) => {
  try {
    const { userID, petID, foodID, quantity } = req.body;

    if (!userID || !petID || !foodID || !quantity) {
      throw new AppError("Missing required fields", 400);
    }

    // Tìm user và house của họ
    const user = await User.findById(userID).populate("house");
    if (!user || !user.house) {
      throw new AppError("User or user's house not found", 404);
    }

    // Lấy dữ liệu của House
    const house = await House.findById(user.house._id);
    if (!house) {
      throw new AppError("House not found", 404);
    }

    // Kiểm tra xem Pet có tồn tại không
    const pet = await Pet.findById(petID);
    if (!pet) {
      throw new AppError("Pet not found", 404);
    }

    // Kiểm tra xem thực phẩm có trong chest không
    const foodItem = house.chest.food.find(
      (food) => food._id.toString() === foodID
    );

    if (!foodItem) {
      throw new AppError("Food not found in chest", 404);
    }

    // Kiểm tra xem lượng thực phẩm có đủ để sử dụng không
    if (foodItem.quantity < quantity) {
      throw new AppError("Not enough food in chest", 400);
    }

    // Giảm số lượng thực phẩm trong chest
    foodItem.quantity -= quantity;

    // Nếu số lượng thực phẩm bằng 0 thì xóa khỏi chest
    if (foodItem.quantity === 0) {
      house.chest.food = house.chest.food.filter(
        (food) => food._id.toString() !== foodID
      );
    }

    // Tăng exp cho pet
    const expGained = 15 * quantity; // Mỗi thức ăn sẽ tăng 15 exp
    pet.exp += expGained;

    // Lưu cập nhật vào house và pet
    await house.save();
    await pet.save();

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { pet, house },
      null,
      `Pet has been fed successfully with ${quantity} of food and gained ${expGained} exp.`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = feedPet;
