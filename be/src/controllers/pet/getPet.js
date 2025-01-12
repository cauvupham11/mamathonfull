const Pet = require('../../models/pet');
const utilsHelper = require('../../helpers/utilsHelper');

const getPet = async (req, res) => {
    try {
        const userId = req.user.id;
        const pets = await Pet.find({ owner: userId });
        utilsHelper.sendResponse(res, 200, true, pets, null, 'Pets retrieved successfully');
    } catch (error) {
        utilsHelper.sendResponse(res, 500, false, null, error, 'Error retrieving pets');
    }
};

module.exports = getPet;