const jsonwebtoken = require('jsonwebtoken')
// jwt 密钥
const { secret } = require('../config')
const User = require('../models/users')
const Post = require('../models/posts')


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
      // ctx.throw(409, '用户名已存在')
      // 登录成功返回token
      ctx.body = {
        status: 409,
        message: '用户名已存在，换一个名字',
      }
      return
    }
    const user = await new User(ctx.request.body).save()

    ctx.body = {
      status: 200,
      user,
    }
  }

  // 用户登录
  // 需要获取用户提供的登录信息进行验证
  // 使用jwt
  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    try {
      const user = await User.findOne(ctx.request.body)
      const { _id, name } = user
      // 拿_id和name加密
      const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
      // 登录成功返回token
      ctx.body = {
        status: 200,
        data: {
          token,
          user,
        }
      }

    } catch (error) {
      ctx.body = {
        status: 401,
        message: "登录失败"
      }
    }
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

  // 获取自己的信息
  async findUserInfo(ctx) {
    const user = await User.findById(ctx.state.user._id)
    ctx.body = user
  }

  // 获取符合条件的用户列表
  async find(ctx) {
    // ctx.body = await User.find()
    // 默认每页展示10个用户信息
    // 可以提供参数每页多少个以及页数以及关键字
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    ctx.body = await User
      .find({ name: new RegExp(ctx.query.q) })
      .limit(perPage).skip(page * perPage)
  }

  // 获取特定用户
  async findById(ctx) {
    try {
      const user = await User.findById(ctx.params.id)
      ctx.body = {
        status: 200,
        data: {
          user
        }
      }
    } catch (error) {
      ctx.body = {
        status: 404,
        message: "用户不存在"
      }
    }
  }

  // 获取用户编写的文章列表
  async listUserPosts(ctx) {
    const posts = await Post.find({author: { _id: ctx.params.id}}).sort({"createdAt": -1}).populate('author') || []
    ctx.body = {
      status: 200,
      data: posts,
    }

  }
}

module.exports = new UserCtl()