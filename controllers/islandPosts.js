const IslandPost = require('../models/islandPosts')
const Island = require('../models/islands')

class IslandPostCtl {
  // 创建岛内帖子
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    })

    const author = ctx.state.user._id
    const island = ctx.params.islandId
    const islandPost = await new IslandPost({ ...ctx.request.body, author, island }).save()

    ctx.body = {
      status: 200,
      data: {
        islandPost,
      }
    }
  }
}

module.exports = new IslandPostCtl()
