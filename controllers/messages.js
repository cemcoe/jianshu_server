const Message = require('../models/messages')

class MessagesCtl {
  // 创建消息
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    })
    const creator = ctx.state.user._id

    const { roomId } = ctx.params

    const message = await new Message({ ...ctx.request.body, creator, roomId }).save()


    ctx.body = {
      status: 200,
      data: {
        message,
      }

    }
  }
}

module.exports = new MessagesCtl()
