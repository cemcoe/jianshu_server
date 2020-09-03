const Post = require('../models/posts')

class PostCtl {
  // 新文章
  async create(ctx) {
    // 校验参数koa-parameter提供的功能
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
    })

    // koa-body 提供的 获取post请求的body功能
    let data = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      author: ctx.state.user._id,
    }

    const post = await new Post(data).save()

    ctx.body = post
  }

}

module.exports = new PostCtl()