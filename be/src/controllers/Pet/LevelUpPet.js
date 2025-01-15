const Pet = require("../../models/pet");

const { sendResponse, AppError } = require("../../helpers/utils");
const blobSubmitPet = require("../MarketPlace/blob/blobSubmitPet");

const levelUpPet = async (req, res, next) => {
  try {
    const { petId } = req.params;

    const pet = await Pet.findById(petId);

    if (!pet) {
      throw new AppError(404, "Không tìm thấy Pet", "Level Up Error");
    }

    const requiredExp = pet.Level * 15;
    if (pet.Exp < requiredExp) {
      throw new AppError(
        400,
        `Cần ${requiredExp - pet.Exp} EXP để lên cấp`,
        "Level Up Error"
      );
    }

    if (pet.Level >= 2) {
      const userConfirmation = req.body.confirm;
      if (!userConfirmation) {
        return sendResponse(
          res,
          200,
          true,
          {
            message: `Pet đủ EXP để lên cấp. Xác nhận để thăng cấp lên Level ${
              pet.Level + 1
            }.`,
          },
          null,
          "Yêu cầu xác nhận từ người dùng"
        );
      }

      await blobSubmitPet(pet);
    }

    pet.Level += 1;
    pet.Exp -= requiredExp;
    pet.Ability = `Level ${pet.Level} Ability`;
    pet.value = parseFloat((pet.value * 1.5).toFixed(2));
    await pet.save();

    sendResponse(
      res,
      200,
      true,
      pet,
      null,
      `Pet đã thăng cấp lên Level ${pet.Level}`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = levelUpPet;
