const Island = require('../models/islands')

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

}


module.exports = new IslandCtl()