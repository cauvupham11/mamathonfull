const { AppError, sendResponse } = require("../../helpers/utils");
const Item = require("../../models/item");

const createItem = async (req, res, next) => {
  try {
    const { name, quantity, type, value } = req.body;
    if (!name || !quantity || !type || !value) {
      throw new AppError("Missing required Field", 400);
    }
    const newItem = new Item({
      name,
      quantity,
      type,
      value,
    });
    await newItem.save();
    sendResponse(
      res,
      200,
      true,
      { newItem },
      null,
      "new item create successfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = createItem;
