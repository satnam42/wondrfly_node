"use strict";
const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({

    activity: { type: String, default: "", },
    point: { type: Number, default: 0 },

    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now },
},

    //   {
    //     id: false
    //   }

);

mongoose.model("pointactivities", activitySchema);
module.exports = activitySchema;