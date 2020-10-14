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
}, { timestamps: true })

module.exports = model('Post', postSchema)
