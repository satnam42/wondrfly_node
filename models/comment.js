const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

const commentSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'user' },
    creatorName: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, ref: 'user' },
    text: { type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
    postId: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'post' },
    createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedOn: { type: mongoose.Schema.Types.Date, default: Date.now }
})

mongoose.model('comment', commentSchema)

module.exports = commentSchema