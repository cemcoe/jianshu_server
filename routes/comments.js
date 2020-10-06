const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/posts/:postId/comments' })

const { create, find } = require('../controllers/comments')

const { secret } = require('../config')
const auth = jwt({ secret })


router.post('/', auth, create)
router.get('/', find)


module.exports = router