const Activity = require('../models/activities')

class ActivitiesCtl {
  // 创建活动
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      // 活动时间
      time: { type: 'string', required: true },
      // 活动详情地址
      detailUrl: { type: 'string', required: true },
      // 图片地址
      bannerImg: { type: 'string', required: true },
    })

    // TODO 只有网站管理有权限管理活动，中后台管理项目

    const activity = await new Activity({ ...ctx.request.body, }).save()
    ctx.body = {
      status: 200,
      data: {
        activity
      }
    }
  }

  // 获取活动列表
  async find(ctx) {
    const activities = await Activity.find().sort({ "createdAt": -1 })
    ctx.body = {
      status: 200,
      data: {
        activities
      }
    }
  }
}

module.exports = new ActivitiesCtl()
