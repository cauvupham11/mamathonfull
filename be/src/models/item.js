const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["necklace", "Socks", "Nameplate"],
    required: true,
  },
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
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
