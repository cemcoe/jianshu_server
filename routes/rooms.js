const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()
// const { checkOwner } = require('../controllers/users.js')
const { create, find } = require('../controllers/rooms.js')
const { secret } = require('../config')

const auth = jwt({ secret })
// jwt 生成的用户信息存放在ctx.state上
router.post('/rooms', auth, create)
router.get('/rooms', auth, find)


module.exports = router