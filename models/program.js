"use strict";
const mongoose = require("mongoose");
const programSchema = mongoose.Schema({
    name: { type: String, default: "", required: true },
    description: { type: String, default: "" },
    type: { type: String, default: ""  },
    price: { type: String, default: "" },
    time :{type:String,default:""},
    code: { type: String, default: "" },
    location:{type:String,default:""},
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("program", programSchema);
module.exports = programSchema;