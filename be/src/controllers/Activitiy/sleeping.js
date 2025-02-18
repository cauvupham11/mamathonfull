const { AppError, sendResponse } = require("../../helpers/utils");
const Activity = require("../../models/activity");
const Pet = require("../../models/pet");

const sleeping = async (req, res, next) => {
  try {
    const { petID } = req.body;
    const pet = await Pet.findById(petID);
    if (!pet) {
      throw new AppError("Missing pet", 404);
    }
    pet.exp += 15;
    await pet.save();
    const activity = new Activity({
      type: "Sleeping",
      pet: pet._id,
      reward: "15 exp",
      status: "Completed",
    });
    await activity.save();
    sendResponse(res, 200, true, { activity }, null, "sleeping successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = sleeping;
