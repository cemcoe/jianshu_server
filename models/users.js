const mongoose = require('mongoose')
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const { Schema, model } = mongoose
// const Schema = mongoose.Schema

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  // select: false 不要将password返回给客户端
  password: { type: String, required: true, select: false },
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },
  bio: { type: String },

  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false,
  },
}, { timestamps: true })

module.exports = model('User', userSchema)
