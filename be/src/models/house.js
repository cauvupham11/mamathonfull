const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    petID: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    capacity: { type: Number, required: true },
    Upgradable: { type: Boolean, default: false }
});
const house = mongoose.model('House', houseSchema);

module.exports = house;