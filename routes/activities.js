const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router()

const { create, find } = require('../controllers/activities')

const { secret } = require('../config')
const auth = jwt({ secret })

// TODO
// 只有管理员有权限创建活动
router.post('/activities', auth, create)
router.get('/activities', find)



module.exports = router