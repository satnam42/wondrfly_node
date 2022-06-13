"use strict";
const mongoose = require("mongoose");
const metaservice = mongoose.Schema({
    pageName: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("metaservice", metaservice);
module.exports = metaservice;