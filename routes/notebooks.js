const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()
// const { checkOwner } = require('../controllers/users.js')
const { create, findById, find, addPostToNoteBook } = require('../controllers/notebooks.js')
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


// 将文章加入连载
// 连载id，文章id
// TODO：目前是不安全的，中间件 检查，登录，文章是自己的，连载是自己的
router.put('/nbs/:noteid/:postid', auth, addPostToNoteBook)

module.exports = router