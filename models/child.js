"use strict";
const mongoose = require("mongoose");

const childSchema = mongoose.Schema({

    name: { type: String, default: "", required: true },
    dob: { type: String, default: "", },
    sex: { type: String, default: "", },
    age: { type: String, default: "", },
    avtar: { type: String, default: "", },
    relationToChild: { type: String, default: "", },
    contactOtherInfo: { type: String, default: "", },
    schoolInfo: { type: String, default: "", },
    interestInfo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag',
            required: true
        },
    ],
    gradeLevel: { type: String, default: "", },
    fromWhereYouHeard: { type: String, default: "", },
    dislikes: { type: String, default: "", },
    alergies: { type: String, default: "" },
    parentNotes: { type: String, default: "", },
    isDeleted: { type: Boolean, default: 'false' },
    createdBy: { type: String, default: "", },
    lastModifiedBy: { type: String, default: "", },
    deletedBy: { type: String, default: "", },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActivated: { type: Boolean, default: true },
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
},

    //   {
    //     id: false
    //   }

);

mongoose.model("child", childSchema);
module.exports = childSchema;




