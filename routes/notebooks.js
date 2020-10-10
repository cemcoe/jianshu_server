const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()
// const { checkOwner } = require('../controllers/users.js')
const { create, findById, find } = require('../controllers/notebooks.js')
const { secret } = require('../config')

const auth = jwt({ secret })
// jwt 生成的用户信息存放在ctx.state上

// router.get('/posts', find)
router.post('/nbs', auth, create)
// 获取连载详情
router.get('/nbs/:id', findById)
// 获取连载列表
router.get('/nbs', find)
// {"title": "连载名称", "abstract": "连载简介"}

module.exports = router