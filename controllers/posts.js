const Post = require('../models/posts')

class PostCtl {
  // 新文章
  async create(ctx) {
    // 校验参数koa-parameter提供的功能
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
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
    const { per_page = 5 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    ctx.body = await Post.find({
      $or: [{ title: q }, { content: q }]
    }).limit(perPage).skip(page * perPage).populate('author')
  }
  
}



module.exports = new PostCtl()