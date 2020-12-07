const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/rooms/:roomId/messages' })

const { create, find } = require('../controllers/messages')

const { secret } = require('../config')
const auth = jwt({ secret })


router.post('/', auth, create)
router.get('/', auth, find)


module.exports = router