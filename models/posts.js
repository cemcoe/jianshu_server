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
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = model('Post', postSchema)
