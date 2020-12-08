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

  // 获取指定聊天室的详情
  // 获取特定文章
  async findById(ctx) {
    try {
      let room = await Room.findById(ctx.params.rid).populate('members')
      ctx.body = {
        status: 200,
        data: {
          room,
        }
      }
    } catch (error) {
      ctx.body = {
        status: 404,
        message: "没有该聊天室"
      }
    }
  }
}



module.exports = new RoomCtl()