require('dotenv').config()
const Hapi = require('hapi')
const routes = {}
//const apiVersion = require('./plugins/apiVersion') // apiVersion
const { sequelize } = require('./models/index')
routes.auth = require('./routes/index')
const Pack = require('./package')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const HapiSwagger = require('hapi-swagger')
// CREATE THE SERVER WITH THIS PARAMETER
const server = Hapi.server({
    port: process.env.PORT,
    host: '0.0.0.0',
    routes: {
        cors: true
    }
})

// Testing connection to Postgres DB
sequelize.authenticate()
    .then(() => {
        console.log('Connected to DB')
    }).catch((err) => {
        console.log('WARNING: Could not connect to Postgres DB')
        console.log('Please, verify DB settings and try again')
        console.log(err)
    })

server.ext('onRequest', async (req, h) => {
    return h.continue
})

server.route(routes.auth)

const init = async () => {
    
    // await server.register({
    //     plugin: apiVersion,
    //     options: [
    //         {
    //             basePath: '/users',
    //             versions: [1]
    //         },
    //         {
    //             basePath: '/login',
    //             versions: [1]
    //         }
    //     ]
    // })
    // CORS
    await server.register({
        plugin: require('hapi-cors'),
        options: {
            origins: ['*'],
            methods: ['POST, GET, PUT, PATCH, DELETE']
        }
    })
    // Documentation
    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: Pack.version
        }
    }
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    await server.start()
    console.log(`Server running on port ${server.info.uri} `)
}

// CALL THE METHOD
init()

module.exports = server
