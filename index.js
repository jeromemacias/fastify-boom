'use strict'

const fp = require('fastify-plugin')

function fastifyErrorPage(fastify, options, next) {
  fastify.setErrorHandler((error, reply) => {
    if (error && error.isBoom) {
      reply
        .code(error.output.statusCode)
        .type('application/json')
        .headers(error.output.headers)
        .send(error.output.payload)
    }
  })

  next()
}

module.exports = fp(fastifyErrorPage, '>=0.39.1')
