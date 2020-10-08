const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()
const { create, login, checkOwner, update, find, findById, findUserInfo,
  listUserPosts, follow, listFollowing, unfollow, listFollowers,
  listUserNoteBooks } = require('../controllers/users.js')
const { secret } = require('../config')

const auth = jwt({ secret })
// jwt 生成的用户信息存放在ctx.state上

router.get('/users', find)
router.post('/users', create)
router.get('/users/:id', findById)
// 获取登录用户的详细信息
router.get('/userinfo', auth, findUserInfo)
// 用户只有在登录状态下才能修改自己的信息
// 两个条件 登录 自己
router.patch('/users/:id', auth, checkOwner, update)
router.delete('/users/:id', ctx => ctx.body = '删除用户')
router.post('/login', login)
router.get('/users/:id/following', listFollowing)
router.put('/users/following/:id', auth, follow)
router.delete('/users/following/:id', auth, unfollow)
router.get('/users/:id/followers', listFollowers)
// 得到用户文章列表
router.get('/users/:id/posts', listUserPosts)
// 得到用户连载列表
router.get('/users/:id/nbs', listUserNoteBooks)
module.exports = router