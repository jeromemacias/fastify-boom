'use strict'

const fp = require('fastify-plugin')

function fastifyErrorPage(fastify, options, next) {
  fastify.setErrorHandler(function errorHandler(error, reply) {
    if (error && error.isBoom) {
      reply
        .code(error.output.statusCode)
        .type('application/json')
        .headers(error.output.headers)
        .send(error.output.payload)

      return
    }

    reply.send(error || new Error('Got non-error: ' + error))
  })

  next()
}

module.exports = fp(fastifyErrorPage, {
  fastify: '>=0.39.1',
  name: 'fastify-boom'
})
