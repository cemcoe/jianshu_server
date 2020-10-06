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

  // 获取评论列表
  async find(ctx) {
    const { postId } = ctx.params
    const comments = await Comment
      .find({ postId })
      .populate('commentator')
    ctx.body = {
      status: 200,
      data: {
        comments
      }
    }
  }
}

module.exports = new CommentsCtl()
