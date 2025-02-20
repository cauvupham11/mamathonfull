const { AppError, sendResponse } = require("../../helpers/utils");
const House = require("../../models/house");

const addItemToChest = async (req, res, next) => {
  try {
    const { houseId, itemName, quantity } = req.body;
    const house = await House.findById(houseId);
    if (!house) {
      throw new AppError("House was not found", 404);
    }
    house.addItemToChest(itemName, quantity);
    await house.save();
    sendResponse(
      res,
      200,
      true,
      { house },
      null,
      "add item to chest was successfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = addItemToChest;
