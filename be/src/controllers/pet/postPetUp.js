const Pet = require('../../models/Pet');
const utilsHelper = require('../../helpers/utilsHelper');

async function postPetUp(req, res) {
    try {
        const { petId } = req.body;
        const pet = await Pet.findById(petId);

        if (!pet) {
            return utilsHelper.sendResponse(res, 404, false, null, null, 'Pet not found');
        }

        const requiredExp = pet.level * 100;
        if (pet.exp >= requiredExp) {
            pet.level += 1;
            pet.exp -= requiredExp;
            await pet.save();
            return utilsHelper.sendResponse(res, 200, true, pet, null, 'Pet leveled up');
        } else {
            return utilsHelper.sendResponse(res, 400, false, null, null, 'Not enough experience to level up');
        }
    } catch (error) {
        return utilsHelper.sendResponse(res, 500, false, null, error, 'Server error');
    }
}

module.exports = postPetUp;