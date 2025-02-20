const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    Name: {
      type: String,
      default: "Unknown",
    },
    WalletAddress: {
      type: String,
      unique: true,
      required: true,
    },

    TotalPets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    off_chain_pets: {
      type: [String],
      default: [],
    },
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    last_login: {
      type: Date,
    },
    Balance: {
      type: Number,
      default: 0,
    },
    balanceFiat: {
      type: Number,
      default: 0,
    },
    tickets: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
