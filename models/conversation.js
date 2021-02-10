'use strict'

const mongoose = require('mongoose')

const chat = mongoose.Schema({
    msgFrom: { type: String, default: "", required: true },
    msgTo: { type: String, default: "", required: true },
    msg: { type: String, default: "", required: true },
    media: {
        image: { type: String, default: '' },
        video: { type: String, default: "" },
        audio: { type: String, default: "" },
        file: { type: String, default: "" }
    },
    room: { type: String, default: "", required: true },
    createdOn: { type: Date, default: Date.now }
})

mongoose.model('Conversation', chat);
module.exports = chat
