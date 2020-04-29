const handlers = require('../handlers/usuario')
const userSchema = require('../schemas/userSchema')

module.exports = [
    {
        method: 'POST',
        path: '/v1/users',
        handler: handlers.createUser,
        options: {
            cors: true,
            tags: ['api'],
            validate: {
                payload: userSchema.create,
                failAction: (request, h, error) => {
                    throw error
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/users/{userUuid}',
        handler: handlers.getUsers,
        options: {
            cors: true,
            tags: ['api'],
            validate: {
                params: userSchema.params,
                failAction: (request, h, error) => {
                    throw error
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/users',
        handler: handlers.getUsers,
        options: {
            cors: true,
            tags: ['api'],
            validate: {
                query: userSchema.query,
                failAction: (request, h, error) => {
                    throw error
                }
            }
        }
    }
]
