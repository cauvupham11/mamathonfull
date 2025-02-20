const { AppError, sendResponse } = require("../../helpers/utils");
const Item = require("../../models/item");

const getAllItem = async (req, res, next) => {
  try {
    const item = await Item.find();
    if (!item) throw new AppError("No item found", 404);
    sendResponse(
      res,
      200,
      true,
      { item },
      null,
      "Get all item was sucessfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = getAllItem;
