const NoteBook = require('../models/notebooks')

class NoteBookCtl {
  // 新连载
  async create(ctx) {
    // 校验参数koa-parameter提供的功能
    ctx.verifyParams({
      title: { type: 'string', required: true },
    })
    const author = ctx.state.user._id

    const notebook = await new NoteBook({ ...ctx.request.body, author }).save()

    ctx.body = {
      status: 200,
      data: {
        notebook,
      }
    }
  }

  // 获取用户的连载
  
}



module.exports = new NoteBookCtl()