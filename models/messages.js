// 对room的评论
const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const { Schema, model } = mongoose
// const Schema = mongoose.Schema

const messageSchema = new Schema({
  __v: { type: Number, select: false },
  roomId: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
}, { timestamps: true })

module.exports = model('Message', messageSchema)
