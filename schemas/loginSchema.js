const Joi = require('@hapi/joi')

module.exports = {
    login: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}
