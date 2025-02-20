const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prizeSchema = new Schema({
  type: {
    type: String,
    enum: ["pet", "food", "item", "balanceFiat"],
    required: true,
  },
  data: {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  probability: {
    type: Number,
    required: true,
  },
});

const Prize = mongoose.model("Prize", prizeSchema);
module.exports = Prize;
