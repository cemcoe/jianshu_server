const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const User = require('./users')
const Island = require('./islands')

const { Schema, model } = mongoose

const islandPostSchema = new Schema({
  __v: { type: Number, select: false },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  island: { type: Schema.Types.ObjectId, ref: 'Island' },
}, { timestamps: true })

module.exports = model('IslandPost', islandPostSchema)
