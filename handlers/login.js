require('dotenv').config()
const { User } = require('../models/index')
const Boom = require('@hapi/boom')
const { matchData } = require('../utils/matchBcrypt')
const { generateToken } = require('../utils/token')

async function login({ payload }, h) {
    const {
        email,
        password
    } = payload
    let matchedUser
    try {
        matchedUser = await User.findOne({
            where: { email }
        })
    } catch (error) {
        throw Boom.badImplementation('Error accessing the database')
    }
    if (!matchedUser) throw Boom.unauthorized('User not found')
    const match = await matchData(matchedUser.dataValues.password, password)
    payload.password = matchedUser.dataValues.password
    if (!match) throw Boom.unauthorized('Invalid password')
    const token = generateToken(payload)

    return h.response({
        msg: 'Access Success',
        token
    }).code(201).header('Content-Type', 'application/json')
}

module.exports = {
    login
}
