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
                        // ageGroup: {
                        //     properties: {
                        //         from: { type: "number", default: 0 },
                        //         to: { type: "number", default: 0 },
                        //     }
                        // },
                        // category: { type: 'string', default: '' },
                        // subcategories: {
                        //     type: 'array',
                        //     items: {
                        //         type: 'string',
                        //         default: '',
                        //     },
                        // },
                    },
                },
            },

        }
    }
];


