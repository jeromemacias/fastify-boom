# fastify-boom

Fastify Boom support - HTTP-friendly error objects

[![Current Version](https://img.shields.io/npm/v/fastify-boom.svg)](https://www.npmjs.com/package/fastify-boom)
[![Build Status](https://travis-ci.org/jeromemacias/fastify-boom.svg?branch=master)](https://travis-ci.org/jeromemacias/fastify-boom)

## Install
```
npm i fastify-boom
```
## Usage
```js
const fastify = require('fastify')()
const Boom = require('boom')

fastify.register(require('fastify-boom'))

fastify.get('/', async function (req, reply) {
  throw new Boom('Opppps!')
})

fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err)
  }
})
```

### Credits

- [boom](https://github.com/hapijs/boom) HTTP-friendly error objects 
