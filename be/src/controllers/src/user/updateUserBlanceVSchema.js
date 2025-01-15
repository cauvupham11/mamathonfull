const Joi = require('joi');

const updateUserBalanceSchema = Joi.object({
    userId: Joi.string().required().messages({
        'string.base': `"userId" should be a type of 'text'`,
        'string.empty': `"userId" cannot be an empty field`,
        'any.required': `"userId" is a required field`
    }) 
});

const validateUpdateUserBalance = (data) => {
    try {
        const { error } = updateUserBalanceSchema.validate(data, { abortEarly: false });
        if (error) {
            throw new Error(`Validation error: ${error.details.map(err => err.message).join(", ")}`);
        }
    } catch (error) {
        console.error("Validation error:", error.message);
        throw error;
    }
};


module.exports = validateUpdateUserBalance;