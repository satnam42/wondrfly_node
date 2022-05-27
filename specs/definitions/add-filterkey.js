module.exports = [
    {
        name: "add-filterkey",
        properties: {
            keywordName: {
                type: "string",
                default: "",
            },
            keywordType: {
                type: "string",
                default: "",
            },
            keywordValue: {
                type: 'array',
                items: {
                    properties: {
                        ageGroup: {
                            properties: {
                                from: { type: "number", default: 0 },
                                to: { type: "number", default: 0 },
                            }
                        },
                        category: { type: 'string' },
                        subcategory: { type: 'string' },
                    },
                },
            },

        }
    }
];


