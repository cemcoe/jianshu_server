const Announcement = require('../models/announcements')

class AnnouncementCtl {
  // 创建公告
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
    })

    // TODO 只有网站管理有权限管理公告，中后台管理项目

    const announcement = await new Announcement({ ...ctx.request.body, }).save()
    ctx.body = {
      status: 200,
      data: {
        announcement
      }
    }
  }

  // 获取指定公告
  async findById(ctx) {
    try {
      const announcement = await Announcement.findById(ctx.params.id)
      
      ctx.body = {
        status: 200,
        data: {
          announcement,
        }
      }
    } catch (error) {
      ctx.body = {
        status: 404,
        message: "没有该公告"
      }
    }
  }


  // 获取活动列表
  // async find(ctx) {
  //   const activities = await Activity.find().sort({ "createdAt": -1 })
  //   ctx.body = {
  //     status: 200,
  //     data: {
  //       activities
  //     }
  //   }
  // }
}

module.exports = new AnnouncementCtl()
