const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()
// const { checkOwner } = require('../controllers/users.js')
const { create } = require('../controllers/posts.js')
const { secret } = require('../config')

const auth = jwt({ secret })
// jwt 生成的用户信息存放在ctx.state上

// router.get('/users', find)
router.post('/posts', auth, create)
// router.get('/users/:id', findById)
// // 获取登录用户的详细信息
// router.get('/userinfo', auth, findUserInfo)
// // 用户只有在登录状态下才能修改自己的信息
// // 两个条件 登录 自己
// router.patch('/users/:id', auth, checkOwner, update)
// router.delete('/users/:id', ctx => ctx.body = '删除用户')
// router.post('/login', login)
// router.get('/users/:id/following', ctx => ctx.body = '获取用户列表')
// router.put('/users/following/:id', ctx => ctx.body = '关注某人')
// router.delete('/users/following/:id', ctx => ctx.body = '取消关注')
// router.get('/users/:id/followers', ctx => ctx.body = '获取粉丝列表')

module.exports = router