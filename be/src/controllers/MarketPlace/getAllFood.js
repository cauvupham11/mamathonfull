const { AppError, sendResponse } = require("../../helpers/utils");
const Food = require("../../models/food");

const getAllFood = async (req, res, next) => {
  try {
    const food = await Food.find();
    if (!food) throw new AppError("No food found", 404);
    sendResponse(
      res,
      200,
      true,
      { food },
      null,
      "Get all food was successfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = getAllFood;
