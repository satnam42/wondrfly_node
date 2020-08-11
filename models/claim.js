


"use strict";
const mongoose = require("mongoose");

const claim = mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'program'
    },
    status: {
        type: String,
        enum: ['approve', 'reject', 'in-progress'],
        default: 'in-progress'
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },

},

    //   {
    //     id: false
    //   }

);

mongoose.model("claim", claim);
module.exports = claim;




