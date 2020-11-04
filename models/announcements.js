// 搞一个公告接口

const mongoose = require('mongoose')
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const { Schema, model } = mongoose
// const Schema = mongoose.Schema

const AnnouncementSchema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true })

module.exports = model('Announcement', AnnouncementSchema)
