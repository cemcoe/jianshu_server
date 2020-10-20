const mongoose = require('mongoose')
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
const User = require('./users')
const Post = require('./posts')

const { Schema, model } = mongoose
// const Schema = mongoose.Schema

const noteBooksSchema = new Schema({
  __v: { type: Number, select: false },
  // 连载名字
  title: { type: String, required: true },
  // 连载介绍
  abstract: { type: String, required: false, default: '连载简介' },
  // 创建连载的人
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  // 连载图表
  icon: { type: String, required: false, default: 'https://cdn.pixabay.com/photo/2020/09/08/21/46/trees-5555938_960_720.jpg' },

  // 连载中的文章列表
  postList: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    default: [],
  },
}, { timestamps: true })

module.exports = model('NoteBook', noteBooksSchema)
