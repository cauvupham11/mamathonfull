const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Meat", "Vegetable", "Fruit"],
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  value: {
    type: Number,
    required: true,
  },
  onChain: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
