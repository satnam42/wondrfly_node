module.exports = [
    {
        name: "create-suggestion",
        properties: {
            name: {
                type: "array",
                items: {
                    type: 'string',
                    default: '',
                },
            },
            category: {
                type: "string",
                default: "",
            },
            subcategoires: {
                type: 'array',
                items: {
                    type: 'string',
                    default: '',
                },
            }
        }
    }
];
