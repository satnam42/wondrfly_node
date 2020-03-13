module.exports = [
    {
        name: "productCreate",
        properties: {
            name: {
                type: "string"
            },
            description: {
                type: "string"
            },
            quantity: {
                type: "number"
            },
            costPerEach: {
                type: "string"
            },
            overAllPrice: {
                type: "string"
            },
            note: {
                type: "string"
            },
            category: {
                type: "string"
            },
            image: {
                type: "string",
            },
            height: {
                type: "string"
            },
            width: {
                type: "string"
            },
            weight: {
                type: "string"
            },
            length: {
                type: "string"
            },
            manufacturer: {
                type: "string"
            },
            sku: {
                type: "string"
            },
            status: {
                type: "string",
                enum: ["active", "deactive", "out of stock"]
            },
            assignedVendors: {
                type: 'array',
                items: {
                    type: 'array',
                    properties: {
                        vendorId: { type: "string", default: "" },
                    }
                }
            },
            // variation: {
            //     properties: {
            //         name: { type: "string", default: "" },
            //         items: {
            //             type: 'array',
            //             items: {
            //                 type: 'array',
            //                 properties: {
            //                     type: { type: "string", default: "" },
            //                     price: { type: "number", default: 0 },
            //                 }
            //             }
            //         }
            //     }

            // }
            variation: {
                properties: {
                    items: {
                        type: 'array',
                        items: {
                            type: 'array',
                            properties: {
                                type: { type: "string", default: "" },
                                price: { type: "number", default: 0 },
                            }
                        }
                    }
                }

            }

        }
    }
];
