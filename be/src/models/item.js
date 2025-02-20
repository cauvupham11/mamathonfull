const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Necklace", "Socks", "Nameplate"],
    required: true,
  },
  image: {
    type: String,
    required: true,
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

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
