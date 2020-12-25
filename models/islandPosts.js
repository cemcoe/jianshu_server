const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const { Schema, model } = mongoose

const islandPostSchema = new Schema({
  __v: { type: Number, select: false },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  islandId: { type: String, required: true },
}, { timestamps: true })

module.exports = model('IslandPost', islandPostSchema)
