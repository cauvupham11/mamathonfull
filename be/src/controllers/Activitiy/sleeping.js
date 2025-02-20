const { AppError, sendResponse } = require("../../helpers/utils");

const Pet = require("../../models/pet");

const sleeping = async (req, res, next) => {
  try {
    const { petID } = req.body;
    // Kiểm tra xem pet có tồn tại không
    const pet = await Pet.findById(petID);
    if (!pet) {
      throw new AppError("Missing pet", 404);
    }

    // Tăng EXP cho pet
    pet.exp += 20; // Tăng 20 exp khi pet ngủ
    await pet.save();

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { pet },
      null,
      "Pet has slept and gained 20 exp."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = sleeping;
