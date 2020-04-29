const { User } = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const uuid4 = require('uuid/v4')
const Boom = require('@hapi/boom')
const { generateHash } = require('../utils/generateHash')
/**
createCourses. (use period)

*@param {Object} payload Registry to save.
*@param {Object} h
*@return {Object} Return Notification saved log or Error.
*/

async function createUser({ payload }, h) {
    const dataGenerated = {
        uuid: uuid4()
    }
    payload.password = generateHash(payload.password, 10)
    const dataCourse = Object.assign(payload, dataGenerated)
    let user
    try {
        user = await User.create(dataCourse)
    } catch (error) {
        console.log(error);
        
        throw Boom.badImplementation(error)
    }
    return h
        .response({ id: user.uuid, message: 'Successfully created' })
        .code(201)
        .header('Content-Type', 'application/json')
}

/**
updateCourse. (use period)

* @param {Object} id Existing course id
* @param {Object} payload Registry to save.
* @param {Object} h
* @return {Object} Return Notification updated log or Error.
*/
async function updateUser({ params, payload }, h) {
    let user
    try {
        user = await User.findOne({ where: { uuid: params.id } })
    } catch (error) {
        throw Boom.boomify(new Error('Something went wrong', { status: 500 }))
    }
    if (!user) {
        return h
            .response({ message: 'Not found' })
            .code(404)
            .header('Content-Type', 'application/json')
    }

    try {
        await User.update({ payload }, { where: { uuid: user.uuid } })
    } catch (error) {
        throw Boom.badImplementation('Something went wrong')
    }

    return h
        .response({ id: user.uuid, message: 'Successfully updated' })
        .code(200)
        .header('Content-Type', 'application/json')
}

/**
getCourses. (use period)

*@param {Object} query Querys to filter search
*@param {Object} h
*@return {Object} Return Course list

*/
async function getUsers({ query }, h) {
    let totalUsers, listUsers
    let filters = {}
    try {
        totalUsers = await User.count()
    } catch (error) {
        throw Boom.badImplementation('Error accessing the database')
    }
    // Paginación
    if (query.page && query.offset) {
        throw Boom.badRequest('Only one query param is allowed: offset or page')
    }
    let {
        name,
        page = 1,
        limit = 20,
        offset = (page - 1) * limit
    } = query
    const totalPages = Math.ceil(totalUsers / limit)
    if (page === totalPages) limit -= totalPages * limit - totalUsers
    // Validación de querys de búsqueda
    if (name) filters = { name: { [Op.substring]: name } }
    try {
        listUsers = await User.findAll({ where: filters })
    } catch (error) {
        throw Boom.badImplementation('Error accessing the database')
    }
    const matches = listUsers.length
    listUsers = listUsers.slice(offset, offset + limit)
    return h
        .response({
            page,
            perPage: limit,
            totalUsers: matches,
            courses: listUsers
        })
        .code(200)
        .header('Content-Type', 'application/json')
}

/**
getCoursebyUuid. (use period)

*@param {Object} request Query for pagination, and courseUuid param for find a specifyc course
*@param {Object} h
*@return {Object} Return Course

*/

async function getUserbyUuid({ params }, h) {
    let { userUuid } = params
    let user
    try {
        user = await User.findOne({ where: { uuid: userUuid } })
    } catch (error) {
        throw Boom.badImplementation('Error accessing the database')
    }
    return h
        .response(user)
        .code(200)
        .header('Content-Type', 'application/json')
}

module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUserbyUuid
}
