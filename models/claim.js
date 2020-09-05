


"use strict";
const mongoose = require("mongoose");

const claim = mongoose.Schema({
    requestOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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




