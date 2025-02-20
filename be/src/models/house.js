const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chestItemSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const houseSchema = new Schema(
  {
    level: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: true,
    },
    chest: {
      items: [chestItemSchema],
      food: [chestItemSchema],
    },
    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chestCapacity: {
      type: Number,
      enum: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      required: true,
      validate: {
        validator: function (value) {
          const validChestCapacity = value === this.level * 5 + 5;
          return validChestCapacity;
        },
        message: (props) => `${props.value} không khớp với cấp độ của house.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);
module.exports = House;
