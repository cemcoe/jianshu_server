const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()
// const { checkOwner } = require('../controllers/users.js')
const { create, } = require('../controllers/notebooks.js')
const { secret } = require('../config')

const auth = jwt({ secret })
// jwt 生成的用户信息存放在ctx.state上

// router.get('/posts', find)
router.post('/nb', auth, create)
// {"title": "连载名称", "abstract": "连载简介"}

module.exports = router