const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/posts/:postId/comments' })

const { create } = require('../controllers/comments')

const { secret } = require('../config')
const auth = jwt({ secret })


router.post('/', auth, create)


module.exports = router