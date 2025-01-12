const House = require('../../models/house');
const utilsHelper = require('../../helpers/utilsHelper');
const AppError = utilsHelper.AppError;

const getHouseList = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const houses = await House.find({ owner: userId });
        if (!houses) {
            return next(new AppError(404, 'No houses found for this user', 'NotFoundError'));
        }
        utilsHelper.sendResponse(res, 200, true, houses, null, 'Houses retrieved successfully');
    } catch (error) {
        next(new AppError(500, error.message, 'ServerError'));
    }
};

module.exports = getHouseList;