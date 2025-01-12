const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    AssetID: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    SellerID: {
        type: String,
        required: true
    },
    TransactionID: {
        type: String,
        required: true
    },
    OnChain: {
        type: Boolean,
        required: true
    },
    Tradable: {
        type: Boolean,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    TransactionStatus: {
        type: String,
        required: true
    },
    Stock: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const MarketPlace = mongoose.model('MarketPlace', marketplaceSchema);

module.exports = MarketPlace;