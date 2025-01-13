const { getMarketplace, getHouse, transferOwnership } = require('../utils/blockchain');

async function buyHouseFromMarketplace(buyerAddress, houseId) {
    try {
        const marketplace = await getMarketplace();
        const house = await getHouse(houseId);

        if (!house) {
            throw new Error('House not found');
        }

        if (house.owner === buyerAddress) {
            throw new Error('Buyer already owns this house');
        }

        const price = house.price;
        const buyerBalance = await marketplace.getBalance(buyerAddress);

        if (buyerBalance < price) {
            throw new Error('Insufficient funds');
        }

        await marketplace.transferFunds(buyerAddress, house.owner, price);
        await transferOwnership(houseId, buyerAddress);

        return {
            success: true,
            message: 'House purchased successfully',
            houseId: houseId,
            newOwner: buyerAddress
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

module.exports = buyHouseFromMarketplace;