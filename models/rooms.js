const mongoose = require('mongoose')
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
const User = require('./users')
const Message = require('./messages')

const { Schema, model } = mongoose
// const Schema = mongoose.Schema

const roomSchema = new Schema({
  __v: { type: Number, select: false },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  // 最新消息
  latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
}, { timestamps: true })

module.exports = model('Room', roomSchema)
