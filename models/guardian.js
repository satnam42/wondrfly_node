


"use strict";
const mongoose = require("mongoose");

const guardianSchema = mongoose.Schema({
    name: { type: String, default: "", required: true },
    age: { type: String, default: "", },
    sex: { type: String, default: "", },
    avtar: { type: String, default: "", },
    email: { type: String, default: "", },
    personalNote: { type: String, default: "", },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
},

    //   {
    //     id: false
    //   }

);

mongoose.model("guardian", guardianSchema);
module.exports = guardianSchema;




