const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const User = require('./users')

const { Schema, model } = mongoose

const islandSchema = new Schema({
  __v: { type: Number, select: false },
  // 岛主，创建小岛的人
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  // 小岛名字
  name: { type: String, required: true },
  // 小岛介绍
  abstract: { type: String, required: false, default: '小岛简介' },
  // 连载图标
  icon: { type: String, required: false, default: 'https://cdn.pixabay.com/photo/2020/09/08/21/46/trees-5555938_960_720.jpg' },

  // 小岛成员
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },


}, { timestamps: true })

module.exports = model('Island', islandSchema)
