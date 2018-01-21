'use strict'

const fastify = require('fastify')()
const plugin = require('.')
const Boom = require('boom')

fastify.register(plugin)

fastify.get('/', async function(req, reply) {
  throw new Boom('Opppps!', { message: 'Oops?' })
})

fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err)
  }
})
