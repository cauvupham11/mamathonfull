const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petSchema = new Schema({
    _id: Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Exp: { type: Number, default: 0 },
    landID: { type: Schema.Types.ObjectId, ref: 'Land' },
    factionID: { type: Schema.Types.ObjectId, ref: 'Faction' },
    Ability: { type: String, required: true },
    level: { type: Number, default: 1 },
    OnChain: { type: Boolean, default: false },
    value: { type: Number, default: 0 },
    tradable: { type: Boolean, default: true },
    last_traded_with: { type: Schema.Types.ObjectId, ref: 'User' },
    Skills: [{ type: String }]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;