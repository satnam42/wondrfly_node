"use strict";
const mongoose = require("mongoose");

const products = mongoose.Schema({
    name: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    quantity: { type: Number, default: 0, required: true },
    costPerEach: { type: String, default: "" },
    overAllPrice: { type: String, default: "" },
    image: { type: String, default: "" },
    note: { type: String, default: "" },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    height: { type: String, default: "" },
    width: { type: String, default: "" },
    weight: { type: String, default: "" },
    length: { type: String, default: "" },
    manufacturer: { type: String, default: "" },
    sku: { type: String, default: "" },
    status: {
        type: String, default: "active",
        enum: ["active", "inActive", "out of stock"]
    },
    assignedVendors: [{ vendorId: { type: String, default: "" } }],
    // variation: {
    //     name: {
    //         type: String, default: ""
    //     },

    //     items: [
    //         {
    //             type: { type: String, default: "" },
    //             price: { type: Number, default: "" },
    //         },
    //     ]
    // },
    variation: {
        items: [
            {
                type: { type: String, default: "" },
                price: { type: Number, default: "" },
            },
        ]
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("products", products);
module.exports = products;
