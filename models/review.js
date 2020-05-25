"use strict";
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    },
    rating: {
        type: Number,
        required: [true, 'A rating is required.'],
        min: [1, 'A minimum rating of "1" is required.'],
        max: [5, '"5" is the maximum rating.']
    },
    review: { type: String, default: "", required: true },
    postedOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
},

    //   {
    //     id: false
    //   }

);
// Round entered rating to nearest integer before saving to db.
reviewSchema.pre('save', function (next) {
    Math.round(this.rating);
    next();
});
mongoose.model("review", reviewSchema);
module.exports = reviewSchema;
