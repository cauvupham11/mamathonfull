const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const activitySchema = new Schema({
  type: {
    type: String,
    enum: ["Feeding", "Sleeping", "Login", "Battle", "Playing"],
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  energyGain: {
    type: Number,
    default: 15,
  },
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  reward: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Completed", "Pending", "Failed"],
    default: "Pending",
  },
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
