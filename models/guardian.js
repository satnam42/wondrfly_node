


"use strict";
const mongoose = require("mongoose");

const guardianSchema = mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    email: { type: String, default: "" },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    relationToChild: { type: String, default: "" },
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
},

    //   {
    //     id: false
    //   }

);

mongoose.model("guardian", guardianSchema);
module.exports = guardianSchema;




