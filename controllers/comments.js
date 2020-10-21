const Comment = require('../models/comments')
const Post = require('../models/posts')

class CommentsCtl {
  // 创建评论
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    })
    const commentator = ctx.state.user._id
    const { postId } = ctx.params
    const comment = await new Comment({ ...ctx.request.body, commentator, postId }).save()
    // 获取文章评论数据数量
    const commentcount = (await Comment.find({ postId })).length
    // 更新文章评论数量
    const post = await Post.findByIdAndUpdate(postId, { commentcount }, { new: true })


    ctx.body = {
      status: 200,
      data: {
        comment,
        commentcount,
      }

    }
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
