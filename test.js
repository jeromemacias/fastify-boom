'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Boom = require('@hapi/boom')
const boomPlugin = require('.')

test('set the default error', (t) => {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(boomPlugin)

  fastify.get('/', (request, reply) => {
    reply.code(401).send(new Error('invalid password'))
  })

  fastify.inject({ method: 'GET', url: '/' }, (err, res) => {
    t.error(err)

    t.equal(res.statusCode, 401)
    t.equal(res.statusMessage, 'Unauthorized')
    t.include(JSON.parse(res.payload), { message: 'invalid password' })

    fastify.close()
  })
})

test('set the boom error without plugin', (t) => {
  t.plan(5)

  const fastify = Fastify()

  fastify.get('/', (request, reply) => {
    reply.send(Boom.unauthorized('invalid password', 'sample'))
  })

  fastify.inject({ method: 'GET', url: '/' }, (err, res) => {
    t.error(err)
    t.doesNotHave(res.headers, {
      'www-authenticate': 'sample error="invalid password"'
    })
    t.equal(res.statusCode, 500)
    t.equal(res.statusMessage, 'Internal Server Error')
    t.include(JSON.parse(res.payload), { message: 'invalid password' })

    fastify.close()
  })
})

test('set the boom error', (t) => {
  t.plan(5)

  const fastify = Fastify()
  fastify.register(boomPlugin)

  fastify.get('/boom', (request, reply) => {
    reply.send(Boom.unauthorized('invalid password', 'sample'))
  })

  fastify.inject({ method: 'GET', url: '/boom' }, (err, res) => {
    t.error(err)

    t.include(res.headers, {
      'www-authenticate': 'sample error="invalid password"'
    })
    t.equal(res.statusCode, 401)
    t.equal(res.statusMessage, 'Unauthorized')
    t.include(JSON.parse(res.payload), { message: 'invalid password' })

    fastify.close()
  })
})
