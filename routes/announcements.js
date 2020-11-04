const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router()

const { create,findById } = require('../controllers/announcements')

const { secret } = require('../config')
const auth = jwt({ secret })

// TODO
// 只有管理员有权限创建活动
router.post('/announcements', auth, create)
router.get('/announcements/:id', findById)



module.exports = router