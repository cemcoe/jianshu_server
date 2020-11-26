const jsonwebtoken = require('jsonwebtoken')
// jwt 密钥
const { secret } = require('../config')
const User = require('../models/users')
const Post = require('../models/posts')
const NoteBook = require('../models/notebooks')


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
      // name 和password 是比较重要的资源，一般不允许用户随意更改
      gender: { type: "string", required: false },
      bio: { type: "string", required: false },
      avatar: { type: "string", required: false },
    })

    // TODO try catch 捕获错误
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
    // 默认是原先的数据，加new可以配置返回新数据
    if (!user) { ctx.throw(404, '用户不存在') }

    // 前端更新用户信息，返回更新后的完整的用户信息，不然前端要先请求该接口，
    // 而后还要请求获取用户信息的接口
    // console.log(user)

    ctx.body = {
      status: 200,
      data: {
        user
      }
    };
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
  // 公开发表文章列表
  async listUserPosts(ctx) {
    // 未来需要将status抽离，默认获取公开文章列表
    // 让前端传status，来获取不同状态的文章列表,
    // TODO 语义化
    // private public

    const { status } = ctx.query

    const posts = await Post.find({ author: { _id: ctx.params.id }, status: status }).sort({ "createdAt": -1 }).populate('author') || []
    ctx.body = {
      status: 200,
      data: posts,
    }
  }

  // 获取用户创建的连载
  async listUserNoteBooks(ctx) {
    const notebooks = await NoteBook.find({ author: { _id: ctx.params.id } }) || []
    ctx.body = {
      status: 200,
      data: {
        notebooks,
      }
    }

  }

  // 关注
  // 关注用户接口
  async follow(ctx) {

    // 要考虑的情况：
    // 1. 用户没有登录
    // 2. 用户关注自己
    // 3. 用户已经关注该用户
    // 4. 被关注用户已将该用户加入黑名单
    // 。。。
    const me = await User.findById(ctx.state.user._id).select('+following')
    // 关注列表包含了要关注的用户
    if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id)
      me.save()
      ctx.status = 204
    } else {
      ctx.body = {
        status: 401,
        message: '你已经关注此用户'
      }
    }

  }

  // 获取用户关注列表
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following')
    if (!user) {
      ctx.throw(404)
    }
    ctx.body = {
      status: 200,
      data: {
        following: user.following
      }
    }
  }

  // 粉丝列表
  async listFollowers(ctx) {
    // 数据库条件查询
    const users = await User.find({ following: ctx.params.id })
    ctx.body = {
      status: 200,
      data: {
        followers: users
      }
    }
  }

  // 取消关注用户接口
  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following')
    // 关注列表包含了要关注的用户
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      me.following.splice(index, 1)
      me.save()
      ctx.status = 204
    } else {
      ctx.body = {
        status: 401,
        message: '取消关注失败'
      }
    }
  }
}

module.exports = new UserCtl()