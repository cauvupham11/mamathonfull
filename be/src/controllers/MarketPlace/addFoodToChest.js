const Food = require("../../models/food");
const House = require("../../models/house");
const { AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../models/user");

const addFoodToChest = async (req, res, next) => {
  try {
    const { userID, foodID, quantity } = req.body;

    if (!userID || !foodID || !quantity) {
      throw new AppError("Missing required fields", 400);
    }

    // Tìm food theo foodID
    const food = await Food.findById(foodID);
    if (!food) {
      throw new AppError("Food not found", 404);
    }

    // Kiểm tra xem số lượng thực phẩm người dùng muốn mua có nhỏ hơn hoặc bằng số lượng có trong food hay không
    if (food.quantity < quantity) {
      throw new AppError("Not enough food available", 400);
    }

    // Tìm user và nhà của họ
    const user = await User.findById(userID).populate("house");
    if (!user || !user.house) {
      throw new AppError("User or user's house not found", 404);
    }

    const house = await House.findById(user.house._id);
    if (!house) {
      throw new AppError("House not found", 404);
    }

    // Kiểm tra xem người dùng có đủ balanceFiat để mua thực phẩm không
    const totalCost = food.value * quantity;
    if (user.balanceFiat < totalCost) {
      throw new AppError("Insufficient balanceFiat", 400);
    }

    // Giảm số dư balanceFiat của người dùng
    user.balanceFiat -= totalCost;
    await user.save();

    // Kiểm tra xem thực phẩm đã có trong chest chưa
    let foodItem = house.chest.food.find(
      (food) => food._id.toString() === foodID
    );

    if (foodItem) {
      // Nếu thực phẩm đã có trong chest, kiểm tra số lượng có đủ không
      if (foodItem.quantity + quantity > house.chestCapacity) {
        throw new AppError("Exceeds chest capacity", 400);
      }
      // Tăng số lượng thực phẩm trong chest
      foodItem.quantity += quantity;
    } else {
      // Nếu chưa có, tạo mới thực phẩm và thêm vào chest
      foodItem = {
        _id: food._id,
        name: food.name,
        type: food.type,
        quantity: quantity,
        value: food.value,
      };

      // Kiểm tra số lượng có vượt quá capacity không
      if (quantity > house.chestCapacity) {
        throw new AppError("Exceeds chest capacity", 400);
      }

      house.chest.food.push(foodItem);
    }

    // Giảm quantity trong food model (gốc)
    food.quantity -= quantity;
    await food.save();

    // Lưu cập nhật vào house
    await house.save();

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { user, house },
      null,
      `Added ${quantity} of ${food.name} to the chest and deducted ${totalCost} USD from user's balanceFiat`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = addFoodToChest;
