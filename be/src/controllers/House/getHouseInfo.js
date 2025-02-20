const { sendResponse, AppError } = require("../../helpers/utils");
const User = require("../../models/user");

const getUserHouseInfo = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("house");
    if (!user) {
      throw new AppError(404, "User not found", "Get User House Info Error");
    }

    if (!user.house) {
      throw new AppError(
        404,
        "User does not have a house",
        "Get User House Info Error"
      );
    }

    sendResponse(
      res,
      200,
      true,
      {
        userId: user._id,
        house: {
          houseId: user.house._id,
          level: user.house.level,
          chestCapacity: user.house.chestCapacity,
          chest: user.house.chest,
        },
      },
      null,
      "Lấy thông tin House của User thành công"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getUserHouseInfo;
