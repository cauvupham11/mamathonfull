const User = require("../../models/user");
const House = require("../../models/house");
const { AppError, sendResponse } = require("../../helpers/utils");

const upgradeHouse = async (req, res, next) => {
  try {
    const { userID } = req.body;

    // Tìm User theo ID và populate thông tin house
    const user = await User.findById(userID).populate("house");
    if (!user) throw new AppError("User not found", 404);

    // Lấy House hiện tại của User
    const currentHouse = user.house;

    // Kiểm tra xem nhà hiện tại của User có phải là cấp cao nhất không
    if (currentHouse.level === 10) {
      throw new AppError("House is already at the highest level", 400);
    }

    // Tìm House cấp tiếp theo
    let newHouse = await House.findOne({ level: currentHouse.level + 1 });

    if (!newHouse) {
      newHouse = new House({
        level: currentHouse.level + 1,
        owners: [user._id],
        chest: { items: [], food: [] },
        chestCapacity: (currentHouse.level + 1) * 5 + 5,
      });
      await newHouse.save();
    }

    user.house = newHouse._id;
    await user.save();

    newHouse.owners.push(user._id);
    await newHouse.save();

    sendResponse(
      res,
      200,
      true,
      { user, house: newHouse },
      null,
      "House upgraded successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = upgradeHouse;
