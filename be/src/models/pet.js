const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const petSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Exp: {
      type: Number,
      default: 0,
    },
    Ability: {
      type: String,
      default: "Basic",
    },
    Level: {
      type: Number,
      default: 1,
    },
    model3D: {
      type: String,
      required: true,
    },
    OnChain: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 100,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
