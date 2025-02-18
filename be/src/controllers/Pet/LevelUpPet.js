const { AppError, sendResponse } = require("../../helpers/utils");
const Pet = require("../../models/pet");

const levelUp = async (req, res, next) => {
  try {
    const { petID, signerAddress, keyName } = req.body;
    const pet = await Pet.findOne(petID);
    if (!pet) {
      throw new AppError("Pet not found", 404);
    }
    const reuiredExp = pet.calculateRequiredExp();
    if (pet.exp >= reuiredExp) {
      pet.level += 1;
      pet.exp = 0;
      pet.value += 50;
      await pet.save();
      const encodedPetData = Buffer.from(
        JSON.stringify({
          name: pet.name,
          level: pet.level,
          exp: pet.exp,
          value: pet.value,
          owner: pet.owner,
          onChain: true,
        })
      ).toString("base64");
      // await submitBlob(signerAddress, keyName, encodedPetData);
      sendResponse(res, 200, true, { pet }, null, "Pet level Up successfully");
    } else {
      throw new AppError("hot enough EXP to level up", 400);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = levelUp;
