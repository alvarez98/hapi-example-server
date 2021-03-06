require('dotenv').config()
// Requerir el modulo de hapi (Framework)
const Hapi = require('hapi')

// Configurar el servidor de nuestra aplicación. En un contenedor (Docker) si marca error colocar 0.0.0.0 (todos)
const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

// Definicion de función para inicializar el proyecto. Intenamnete hay tareas asincronas
async function init() {
  // Definición de rutas (indicar el método HTTP, URL y controlador de ruta)
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      // El objeto h es un conjunto de utilidades para la respuesta.
      // .redirect(url)
      return h.response('Hola Mundo desde HapiJS').code(200)
    }
  })

  // Arrancar el servidor de HapiJS, se considera una tarea asincrona.
  try {
    await server.start()
    console.log(`Servidor lanzado en: ${server.info.uri}`)
  } catch (error) {
    console.error(error)
    // Salir de nodeJS con un código de error (1), 0 es un código de exito
    process.exit(1)
  }
}

// Inicializar el proyecto
init();