
async function getMarketplace() {
    // Mock implementation of getMarketplace
    return {
        getBalance: async (address) => {
            // Mock implementation of getBalance
            return 1000; // Assume every user has 1000 units of currency
        },
        transferFunds: async (fromAddress, toAddress, amount) => {
            // Mock implementation of transferFunds
            console.log(`Transferred ${amount} from ${fromAddress} to ${toAddress}`);
        }
    };
}

async function getHouse(houseId) {
    // Mock implementation of getHouse
    return {
        id: houseId,
        owner: '0x123',
        price: 500
    };
}

async function transferOwnership(houseId, newOwner) {
    // Mock implementation of transferOwnership
    console.log(`House ${houseId} ownership transferred to ${newOwner}`);
}

module.exports = { getMarketplace, getHouse, transferOwnership };