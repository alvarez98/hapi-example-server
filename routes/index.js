const usuario = require('./users')
const login = require('./login')

module.exports = [
    ...usuario,
    ...login
]