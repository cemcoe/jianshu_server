const Room = require('../models/rooms')

class RoomCtl {
  // 新聊天室
  async create(ctx) {
    const creator = ctx.state.user._id
    const members = [creator, ...ctx.request.body.members]

    const room = await new Room({ creator, members }).save()

    ctx.body = {
      status: 200,
      data: {
        room,
      }
    }
  }

  // 获取聊天室列表
  async find(ctx) {
    const creator = ctx.state.user._id

    const room = await Room.find({
      creator,

    }).sort({ "createdAt": -1 })


    ctx.body = {
      room,
    }
  }


}



module.exports = new RoomCtl()