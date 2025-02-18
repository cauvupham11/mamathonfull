const { AppError, sendResponse } = require("../../helpers/utils");
const Activity = require("../../models/activity");
const Pet = require("../../models/pet");

const feeding = async (req, res, next) => {
  try {
    const { petID } = req.body;
    const pet = await Pet.findById(petID);
    if (!pet) {
      throw new AppError("Pet not found", 404);
    }
    pet.exp += 15;
    await pet.save();
    const activity = new Activity({
      type: "feeding",
      pet: petID,
      reward: "15 EXP",
      status: "Completed",
    });
    await activity.save();
    sendResponse(res, 200, true, { activity }, null, "feeding successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = feeding;
