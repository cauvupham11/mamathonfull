const Prize = require("../../models/prize"); // Sử dụng bảng prize để lưu phần quà
const User = require("../../models/user");
const Pet = require("../../models/pet");
const Food = require("../../models/food");
const { AppError, sendResponse } = require("../../helpers/utils");

const spinWheel = async (req, res, next) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      throw new AppError("User ID is required", 400);
    }

    // Lấy thông tin người dùng
    const user = await User.findById(userID);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Logic trừ phí quay nếu có (ví dụ: 10 balanceFiat)
    const spinCost = 10; // Chi phí quay
    if (user.balanceFiat < spinCost) {
      throw new AppError("Insufficient balance to spin", 400);
    }

    // Trừ đi phí quay
    user.balanceFiat -= spinCost;
    await user.save();

    // Lấy danh sách các phần quà
    const prizes = await Prize.find({});

    // Logic quay: chọn ngẫu nhiên một phần quà
    const random = Math.random();
    let cumulativeChance = 0;
    let selectedPrize = null;

    for (let prize of prizes) {
      cumulativeChance += prize.chance;
      if (random < cumulativeChance) {
        selectedPrize = prize;
        break;
      }
    }

    if (!selectedPrize) {
      throw new AppError("Error selecting prize", 500);
    }

    // Cập nhật phần quà cho người dùng
    if (selectedPrize.type === "pet") {
      const pet = await Pet.findById(selectedPrize.value);
      if (!pet) {
        throw new AppError("Pet not found", 404);
      }
      user.TotalPets.push(pet._id);
      await user.save();
    } else if (selectedPrize.type === "food") {
      const food = await Food.findById(selectedPrize.value);
      if (!food) {
        throw new AppError("Food not found", 404);
      }
      // Thêm food vào chest
      user.house.chest.food.push({
        _id: food._id,
        name: food.name,
        quantity: 1,
      });
      await user.house.save();
    } else if (selectedPrize.type === "item") {
      // Giả sử item đã có trong hệ thống, cập nhật vào chest
      user.house.chest.items.push({
        name: selectedPrize.value,
        quantity: 1,
      });
      await user.house.save();
    } else if (selectedPrize.type === "balance") {
      user.balanceFiat += selectedPrize.value;
      await user.save();
    }

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { prize: selectedPrize },
      null,
      "Spin successful, you won: " + selectedPrize.type
    );
  } catch (error) {
    next(error);
  }
};

module.exports = spinWheel;
