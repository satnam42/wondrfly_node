


"use strict";
const mongoose = require("mongoose");

const childSchema = mongoose.Schema({
    firstName: { type: String, default: "", required: true },
    age: { type: String, default: "", required: true },
    sex: { type: String, default: "", required: true },
    avtar: { type: String, default: "", },
    contact_other_info: { type: String, default: "", },
    schoolinfo: { type: String, default: "", },
    interestinfo: { type: String, default: "", },
    dislikes: { type: String, default: "", },
    alergies: { type: String, default: "" },
    parentNotes: { type: String, default: "", },
    createdBy: { type: String, default: "", },
    lastModifiedBy: { type: String, default: "", },
    deletedBy: { type: String, default: "", },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
},

    //   {
    //     id: false
    //   }

);

mongoose.model("child", childSchema);
module.exports = childSchema;



