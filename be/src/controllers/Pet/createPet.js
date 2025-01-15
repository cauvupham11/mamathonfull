const { AppError, sendResponse } = require("../../helpers/utils");
const Pet = require("../../models/pet");

const addPet = async (req, res) => {
  try {
    const { Name, Ability, model3D } = req.body;

    if (!Name || !model3D) {
      throw new AppError(400, "Name và model3D là bắt buộc", "Add Pet Error");
    }

    const newPet = new Pet({
      Name,
      Ability: Ability || "Basic",
      Level: 1,
      OnChain: false,
      value: 100,
      tradable: false,
      model3D,
    });

    const savedPet = await newPet.save();

    return sendResponse(
      res,
      201,
      true,
      savedPet,
      null,
      "Pet offchain đã được tạo thành công"
    );
  } catch (e) {
    console.error("Lỗi khi thêm pet:", e.message);
    next(e);
  }
};

module.exports = addPet;
