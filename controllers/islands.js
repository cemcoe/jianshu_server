const Island = require('../models/islands')
const IslandPost = require('../models/islandPosts')

class IslandCtl {
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
    })
    const creator = ctx.state.user._id
    const members = [creator]

    const island = await new Island({
      ...ctx.request.body,
      creator,
      members,
    }).save()

    ctx.body = {
      status: 200,
      data: {
        island,
      }
    }
  }

  async listIslandPosts(ctx) {
    const islandPost = await IslandPost.find().sort({ "createdAt": -1 }).populate('island').populate('author')
    ctx.body = {
      status: 200,
      data: {
        islandPost
      }
    }
  }

  async getIslandDetail(ctx) {
    const island = await Island.findById(ctx.params.islandId)
    ctx.body = {
      status: 200,
      data: {
        island
      }
    }
  }

  async listCurrentIslandPosts(ctx) {
    const islandId = ctx.params.islandId
    const islandPost = await IslandPost.find(
      { island: islandId }
    ).sort({ "createdAt": -1 }).populate('author')
    ctx.body = {
      status: 200,
      data: {
        islandPost
      }
    }
  }


}


module.exports = new IslandCtl()