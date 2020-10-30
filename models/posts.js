const mongoose = require('mongoose')
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
const User = require('./users')

const { Schema, model } = mongoose
// const Schema = mongoose.Schema

const postSchema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true, select: false },
  wordcount: { type: Number, required: true },
  commentcount: { type: Number, required: true, default: 0 },
  // 浏览量
  viewcount: { type: Number, required: true, default: 0 },
  imgsLink: { type: [{ type: String }] },
  // 文章状态
  //  status：
  // 0：草稿，仅在本地存在，还没有保存到服务器，数据可能随时丢失
  // -1：私密，不公开，仅自己可以访问，在我的文章界面展示，需要登录 !!!
  // 1：公开，所有人可访问，在首页推荐位和作者个人页展示 !!!
  // -2：丢到垃圾箱，需要通过垃圾箱界面访问
  // -3: 完全删除，软删除，对用户而言，该文章已经完全无法访问，在后台管理系统中会使用到
  // -4：哪有什么岁月静好，只不过内容涉嫌违规，公开文章强制转为私密状态，且用户不能手动更改状态，举报时触发
  status: { type: Number, enum: [-4, -3, -2, -1, 0, 1], required: true, default: -1 },
}, { timestamps: true })

module.exports = model('Post', postSchema)
