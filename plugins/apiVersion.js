const Joi = require('@hapi/joi')
const Boom = require('@hapi/boom')

const acceptSchema = Joi.string().regex(/^application\/json;\s?versions?=\s?\d$/)

const internals = {
  options: null,
  versioned: []
}
function retrieveVersion (accept, matchVersion) {
  const match = accept.match(matchVersion)
  return match instanceof Array ? match[0] : null
}
function findVersionEndpoint (urlPath, accept) {
  const versionedEntry = internals.versioned.find(regex => {
    const path = urlPath.match(regex.matchPath)
    return path instanceof Array
  })
  return versionedEntry ? retrieveVersion(accept, versionedEntry.matchVersion) : null
}

module.exports = {
  name: 'apiVersionValidate',
  version: 'v1',
  register: function (server, options) {
    options.forEach((item) => {
      internals.versioned.push({
        matchPath: new RegExp(item.basePath),
        matchVersion: new RegExp(`[${item.versions.join('')}]`)
      })
    })
    server.ext('onRequest', (request, h) => {
      // Don't analyze req's headers if it's a documentation req
      if (request.app.avoidVersionCheck) {
        return h.continue
      } else {
        const { accept } = request.headers
        const isAcceptValid = acceptSchema.validate(accept)
        if (isAcceptValid.error !== null) {
          throw Boom.badRequest('Accept header is not valid')
        }
        const matchedVersion = findVersionEndpoint(request.url.pathname, accept)
        if (matchedVersion) {
          request.app.apiVersion = matchedVersion
          const basePath = `/v${matchedVersion}`
          const url = request.url.pathname
          const route = `${basePath}${url}${request.url.search}`
          request.setUrl(route)
        } else {
          throw Boom.badRequest('Invalid version')
        }
        return h.continue
      }
    })
    return null
  }
}
