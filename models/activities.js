const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const { Schema, model } = mongoose
// const Schema = mongoose.Schema

const ActivitiesSchema = new Schema({
  __v: { type: Number, select: false },
  // 活动名
  title: { type: String, required: true },
  // 活动时间
  time: { type: String, required: true },
  // 活动详情地址
  detailUrl: { type: String, required: true },
  // 图片地址
  bannerImg: { type: String, required: true },
  // 奖励
  award: { type: String }
}, { timestamps: true })

module.exports = model('Activitie', ActivitiesSchema)
