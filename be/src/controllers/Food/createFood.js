const { AppError, sendResponse } = require("../../helpers/utils");
const Food = require("../../models/food");

const createFood = async (req, res, next) => {
  try {
    const { name, quantity, type, value, onChain } = req.body;
    if (!name || !quantity || !type || !value) {
      throw new AppError("Missing required fields", 400);
    }
    const newFood = new Food({
      name,
      quantity,
      type,
      value,
      onChain,
    });
    await newFood.save();
    sendResponse(
      res,
      200,
      true,
      { newFood },
      null,
      "create New Food Sucessfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = createFood;
