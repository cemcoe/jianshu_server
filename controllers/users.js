const jsonwebtoken = require('jsonwebtoken')
// jwt 密钥
const { secret } = require('../config')
const User = require('../models/users')


class UserCtl {
  // 用户注册
  async create(ctx) {
    // 校验参数koa-parameter提供的功能
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })

    const { name } = ctx.request.body
    // koa-body 提供的 获取post请求的body功能
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) {
      ctx.throw(409, '用户名已存在')
    }
    const user = await new User(ctx.request.body).save()

    ctx.body = user
  }

  // 用户登录
  // 需要获取用户提供的登录信息进行验证
  // 使用jwt
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '用户名或密码不正确')
    }
    const { _id, name } = user
    // 拿_id和name加密
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
    // 登录成功返回token
    ctx.body = { token }
  }


  // 中间件检查是不是修改自己的信息
  async checkOwner(ctx, next) {
    // jwt 将 token 解析到的用户信息存放到了ctx.state.user中 ctx.state.user._id
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }


  // 更新用户信息
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      gender: { type: "string", required: false },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) { ctx.throw(404, '用户不存在') }
    ctx.body = ctx.request.body;
  }
}

module.exports = new UserCtl()