const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router()

const { create, } = require('../controllers/islands.js')
const { secret } = require('../config')

const auth = jwt({ secret })

router.post('/islands', auth, create)

module.exports = router