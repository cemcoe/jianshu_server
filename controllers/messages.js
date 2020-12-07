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

  // 获取聊天室中的消息
  async find(ctx) {
    const { roomId } = ctx.params
    const messages = await Message
      .find({ roomId })
    ctx.body = {
      status: 200,
      data: {
        messages,
      }
    }
  }
}

module.exports = new MessagesCtl()
