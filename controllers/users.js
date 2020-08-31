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
}

module.exports = new UserCtl()