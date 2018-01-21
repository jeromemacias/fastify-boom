# fastify-boom

Fastify Boom support - HTTP-friendly error objects

## Install
```
npm i fastify-boom
```
## Usage
```js
const fastify = require('fastify')()
const Boom = require('boom)

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
