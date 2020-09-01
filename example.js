'use strict'

const fastify = require('fastify')()
const Boom = require('@hapi/boom')
const plugin = require('.')

fastify.register(plugin)

fastify.get('/', async function homeRoute() {
  throw new Boom('Opppps!', { message: 'Oops?' })
})

fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err)
  }
})
