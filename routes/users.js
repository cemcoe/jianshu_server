const Router = require('koa-router')

const router = new Router()
const { create } = require('../controllers/users.js')


router.get('/users', ctx => ctx.body = '获取用户列表')
router.post('/users', create)
router.get('/users/:id', ctx => ctx.body = '获取指定用户信息')
router.patch('/users/:id', ctx => ctx.body = '更改某个用户信息')
router.delete('/users/:id', ctx => ctx.body = '删除用户')
router.post('/login', ctx => ctx.body = '用户登录接口')
router.get('/users/:id/following', ctx => ctx.body = '获取用户列表')
router.put('/users/following/:id', ctx => ctx.body = '关注某人')
router.delete('/users/following/:id', ctx => ctx.body = '取消关注')
router.get('/users/:id/followers', ctx => ctx.body = '获取粉丝列表')

module.exports = router