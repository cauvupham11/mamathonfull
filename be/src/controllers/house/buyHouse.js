const { getMarketplace, buyHouseFromMarketplace } = require('../../services/marketplaceService');
const { getUserById } = require('../../services/userService');
const { AppError } = require('../../utils/utilsHelper');
const { sendResponse } = require('../../utils/utilsHelper');

async function buyHouse(req, res, next) {
    try {
        const userId = req.user.id;
        const houseId = req.body.houseId;

        const user = await getUserById(userId);
        if (!user) {
            return next(new AppError(404, 'User not found', 'UserError'));
        }

        const marketplace = await getMarketplace();
        const house = marketplace.find(h => h.id === houseId);
        if (!house) {
            return next(new AppError(404, 'House not found in marketplace', 'HouseError'));
        }
        
        const result = await buyHouseFromMarketplace(userId, houseId);
        if (result.success) {
            return sendResponse(res, 200, true, { house: result.house }, null, 'House purchased successfully');
        } else {
            return next(new AppError(400, 'Failed to purchase house', 'PurchaseError'));
        }
    } catch (error) {
        return next(new AppError(500, 'Internal server error', 'ServerError'));
    }
}

module.exports = { buyHouse };