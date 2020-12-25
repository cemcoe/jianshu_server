const IslandPost = require('../models/islandPosts')
const Island = require('../models/islands')

class IslandPostCtl {
  // 创建岛内帖子
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    })

    const creator = ctx.state.user._id
    const { islandId } = ctx.params
    const islandPost = await new IslandPost({ ...ctx.request.body, creator, islandId }).save()

    ctx.body = {
      status: 200,
      data: {
        islandPost,
      }
    }
  }
}

module.exports = new IslandPostCtl()
