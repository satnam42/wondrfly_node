"use strict";
const mongoose = require("mongoose");
// const guardianSchema = mongoose.Schema({
//     parent: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user'
//     },
//     email: { type: String, default: "" },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user'
//     },
//     relationToChild: { type: String, default: "" },
//     updatedOn: { type: Date, default: Date.now },
//     createdOn: { type: Date, default: Date.now },
// },
// );

const guardianSchema = mongoose.Schema({
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    invitedToEmail: { type: String, default: "" },
    invitedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    relationToChild: { type: String, default: "" },
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
},
);

mongoose.model("guardian", guardianSchema);
module.exports = guardianSchema;




