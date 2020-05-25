"use strict";
const mongoose = require("mongoose");
const programSchema = mongoose.Schema({
    name: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    type: { type: String, default: "", required: true },
    price: { type: String, default: "", required: true },
    code: { type: String, default: "", required: true },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("program", programSchema);
module.exports = programSchema;