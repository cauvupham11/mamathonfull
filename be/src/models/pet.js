const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const calculateRequireExp = (level) => {
  return 100 + (level - 1) * 30;
};
const petSchema = new Schema(
  {
    name: {
      type: String,
    },
    exp: {
      type: Number,
      default: 0,
    },
    ability: {
      type: String,
      default: "Basic",
    },
    level: {
      type: Number,
      default: 1,
    },
    model3D: {
      type: String,
    },
    onChain: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 100,
    },
    owner: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    tradable: {
      type: Boolean,
      default: false,
    },
    last_traded_with: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
petSchema.methods.calculateRequireExp = function () {
  return calculateRequireExp(this.level);
};
const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
