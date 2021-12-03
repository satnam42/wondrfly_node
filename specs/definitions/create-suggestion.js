module.exports = [
    {
        name: "create-suggestion",
        properties: {
            suggestedId: {
                type: "string",
                default: "",
            },
            suggestedTags: {
                type: 'array',
                items: {
                    type: 'string',
                    default: '',
                },
            }
        }
    }
];
