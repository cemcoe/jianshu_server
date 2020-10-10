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

  // 获取连载详情
  async findById(ctx) {
    const notebook = await NoteBook.findById(ctx.params.id).populate('author')
    ctx.body = {
      status: 200,
      data: {
        notebook,
      }
    }
  }

}



module.exports = new NoteBookCtl()