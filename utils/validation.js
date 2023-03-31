//Validation schema
const Joi = require("joi");

const registerValidation = (data) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required(),
    });

    return joiSchema.validate(data);
};

const loginValidation = (data) => {
    const joiSchema = Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required(),
    });

    return joiSchema.validate(data);
};

module.exports = { registerValidation, loginValidation };
