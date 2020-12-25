// 岛内帖子
const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/islands/:islandId/islandPosts' })

const { create, } = require('../controllers/islandPosts.js')

const { secret } = require('../config')
const auth = jwt({ secret })


router.post('/', auth, create)


module.exports = router