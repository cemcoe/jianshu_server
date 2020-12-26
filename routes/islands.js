const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()

const { create, listIslandPosts, getIslandDetail, listCurrentIslandPosts } = require('../controllers/islands.js')
const { secret } = require('../config')

const auth = jwt({ secret })

router.post('/islands', auth, create)
// 获取岛内全部帖子
router.get('/islands/islandPosts', listIslandPosts)
// 获取小岛详情
router.get('/islands/:islandId', getIslandDetail)
// 获取当前小岛帖子
router.get('/islands/:islandId/islandPosts', listCurrentIslandPosts)

module.exports = router