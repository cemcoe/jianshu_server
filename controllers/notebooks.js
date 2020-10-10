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

  // 获取所有连载列表
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    // skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()。

    const notebook = await NoteBook.find({
      $or: [{ title: q }, { content: q }]
    }).sort({ "createdAt": -1 }).limit(perPage).skip(page * perPage).populate('author')

    if (notebook.length === 0) {
      ctx.body = {
        status: 404,
        message: '没有找到连载'
      }
      return
    }
    ctx.body = {
      status: 200,
      data: {
        notebook,
      }
    }
  }

}



module.exports = new NoteBookCtl()