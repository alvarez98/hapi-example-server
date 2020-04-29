const Joi = require('@hapi/joi')

module.exports = {
    create: {
        email: Joi.string().email().required(),
        password: Joi.string().max(10).required(),
        name: Joi.string().required(),
    },
    query: {
        limit: Joi.number().integer().min(1),
        page: Joi.number().integer().min(1),
        offset: Joi.number().integer().min(0),
        name: Joi.string(),
        email: Joi.string()
    },
    params: {
        userUuid: Joi.string().uuid({
            version: 'uuidv4'
        })
    }
}