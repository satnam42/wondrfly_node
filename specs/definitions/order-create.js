module.exports = [
    {
        name: "orderCreate",
        properties: {

            totalItem: {
                type: "number"
            },
            totalAmount: {
                type: "number"
            },
            status: {
                type: 'string', default: "waiting for approval",
                enum: ['waiting for approval', "approved", "packed", "read to ship", 'onhold', "cancelled", "rejected"]
            },
            addressId: {
                type: 'string'
            },
            userId: {
                type: 'string'
            },

            products: {
                type: 'array',
                items: {
                    type: 'array',
                    properties: {
                        quanitity: { type: "number", default: "" },
                        price: { type: "number", default: 0 },
                        productId: { type: "string" },
                    }
                }
            }
        },
    }
];

