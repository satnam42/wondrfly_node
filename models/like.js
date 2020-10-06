const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

const likeSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'user' },
    post: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'post' },
    createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
})

mongoose.model('like', likeSchema)
module.exports = likeSchema
