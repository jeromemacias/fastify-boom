'use strict'

const tap = require('tap')
const test = tap.test
const Fastify = require('fastify')
const boomPlugin = require('.')
const Boom = require('boom')

test('set the default error', function(t) {
  t.plan(4)

  const fastify = Fastify()
  fastify.register(boomPlugin)

  fastify.get('/', function(request, reply) {
    reply.code(401).send(new Error('invalid password'))
  })

  fastify.inject({ method: 'GET', url: '/' }, function(err, res) {
    t.error(err)

    t.equal(res.statusCode, 401)
    t.equal(res.statusMessage, 'Unauthorized')
    t.include(JSON.parse(res.payload), { message: 'invalid password' })

    fastify.close()
  })
})

test('set the boom error without plugin', function(t) {
  t.plan(5)

  const fastify = Fastify()

  fastify.get('/', function(request, reply) {
    reply.send(Boom.unauthorized('invalid password', 'sample'))
  })

  fastify.inject({ method: 'GET', url: '/' }, function(err, res) {
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

test('set the boom error', function(t) {
  t.plan(5)

  const fastify = Fastify()
  fastify.register(boomPlugin)

  fastify.get('/boom', function(request, reply) {
    reply.send(Boom.unauthorized('invalid password', 'sample'))
  })

  fastify.inject({ method: 'GET', url: '/boom' }, function(err, res) {
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
