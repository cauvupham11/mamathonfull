const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  signature: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
