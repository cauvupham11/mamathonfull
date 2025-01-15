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
    LevelHouse: {
      type: Number,
      default: 1,
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
