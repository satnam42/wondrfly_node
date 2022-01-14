"use strict";
const mongoose = require("mongoose");
const permission = mongoose.Schema({
    // entityId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "entity"
    // },
    permissionTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permissionType"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("permission", permission);

module.exports = permission;