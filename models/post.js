const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

const postSchema = new mongoose.Schema({
  title: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  description: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  author: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'user' },
  tag: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'tag' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'Comment' }],
  likes: { type: Number, default: 0 },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  updateOn: { type: mongoose.Schema.Types.Date, default: Date.now },
})

mongoose.model('post', postSchema)

module.exports = postSchema
