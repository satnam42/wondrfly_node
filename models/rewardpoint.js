const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

const rewardPointSchema = new mongoose.Schema({
    ambassador: { type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'user' },
    points: { type: Number, default: 0 },
    createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
    updateOn: { type: mongoose.Schema.Types.Date, default: Date.now },
})

mongoose.model('rewardpoint', rewardPointSchema);

module.exports = rewardPointSchema
