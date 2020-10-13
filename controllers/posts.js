const Post = require('../models/posts')

class PostCtl {
  // 新文章
  async create(ctx) {
    // 校验参数koa-parameter提供的功能
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      // TODO 用户没有将摘要传过来，默认找前几个字
      abstract: { type: 'string', required: true },
    })
    const author = ctx.state.user._id

    const post = await new Post({ ...ctx.request.body, author }).save()

    ctx.body = post
  }

  // 获取文章列表

  // 获取符合条件的文章列表
  // 为首页，推荐页，提供接口
  async find(ctx) {
    // ctx.body = await User.find()
    // 默认每页展示10篇文章
    // 可以提供参数每页多少个以及页数以及关键字
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    // skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()。

    const post = await Post.find({
      $or: [{ title: q }, { content: q }]
    }).sort({ "createdAt": -1 }).limit(perPage).skip(page * perPage).populate('author')

    if (post.length === 0) {
      ctx.body = {
        status: 404,
        message: '没有找到文章'
      }
      return
    }
    ctx.body = {
      status: 200,
      data: {
        post
      }
    }
  }

  // 获取特定文章
  async findById(ctx) {
    try {
      const post = await Post.findById(ctx.params.id).populate('author').select('+content')
      ctx.body = {
        status: 200,
        data: {
          post
        }
      }
    } catch (error) {
      ctx.body = {
        status: 404,
        message: "没有该文章"
      }
    }
  }


  // 中间件检查是不是修改自己的文章
  async checkOwner(ctx, next) {
    // jwt 将 token 解析到的用户信息存放到了ctx.state.user中 ctx.state.user._id
    // 找到文章的作者id和当前登录的用户id比较
    const userId = ctx.state.user._id
    let postId = ctx.params.id
    // 根据文章id找文章作者id
    let post = await Post.findById(postId).populate('author')
    const authorId = JSON.stringify(post.author._id).split('"')[1]
    // authorId 是个对象，mongodb里面的


    // ctx.body = {
    //   "1": typeof authorId,
    //   "2": typeof userId,
    //   "3": authorId,
    //   "4": userId,
    //   "5": authorId === userId
    // }

    if (userId !== authorId) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }



  // 更新文章
  async updateById(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false },
      content: { type: 'string', required: false },
    })

    // TODO try catch 捕获错误
    const post = await Post.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
    // 默认是原先的数据，加new可以配置返回新数据
    if (!post) { ctx.throw(404, '用户不存在') }

    ctx.body = {
      status: 200,
      data: {
        post
      }
    };


  }

}



module.exports = new PostCtl()