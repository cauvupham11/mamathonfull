const { AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../models/user");
const Pet = require("../../models/pet");
const Food = require("../../models/food");

const spinWheel = async (req, res, next) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      throw new AppError("UserID is required", 400);
    }

    // Tìm người dùng
    const user = await User.findById(userID);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Kiểm tra nếu người dùng có vé quay
    if (user.tickets <= 0) {
      throw new AppError("You don't have enough tickets to spin", 400);
    }

    // Giảm số vé của người dùng
    user.tickets -= 1;
    await user.save();

    // Xác suất trúng phần quà
    const randomNumber = Math.random();
    let prize = null;

    if (randomNumber < 0.1) {
      // 10% xác suất trúng pet
      const pets = await Pet.find({ OnChain: false });
      if (pets.length === 0) {
        throw new AppError("No available pets to give", 500);
      }
      const randomPet = pets[Math.floor(Math.random() * pets.length)];
      prize = {
        type: "Pet",
        name: randomPet.name,
        petId: randomPet._id,
      };
    } else if (randomNumber < 0.7) {
      // 60% xác suất trúng food
      const foods = await Food.find();
      if (foods.length === 0) {
        throw new AppError("No available foods to give", 500);
      }
      const randomFood = foods[Math.floor(Math.random() * foods.length)];
      prize = {
        type: "Food",
        name: randomFood.name,
        foodId: randomFood._id,
      };
    } else {
      // 30% xác suất trúng tiền fiat
      const amount = Math.floor(Math.random() * 50) + 1; // Trúng 1 đến 50 fiat
      prize = {
        type: "Fiat",
        amount,
      };

      // Cộng tiền vào balanceFiat của người dùng
      user.balanceFiat += amount;
      await user.save();
    }

    // Gửi kết quả quay cho người dùng
    sendResponse(
      res,
      200,
      true,
      { prize },
      null,
      `You won a ${prize.type}: ${prize.name || prize.amount}`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = spinWheel;
