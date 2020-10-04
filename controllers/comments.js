const Comment = require('../models/comments')

class CommentsCtl {
  // 创建评论
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    })
    const commentator = ctx.state.user._id
    const { postId } = ctx.params
    const comment = await new Comment({ ...ctx.request.body, commentator, postId }).save()
    ctx.body = comment
  }
}

module.exports = new CommentsCtl()
