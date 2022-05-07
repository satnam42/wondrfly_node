module.exports = [
    {
        name: 'bulkPublish',
        properties: {
            programIds: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
            isPublished: {
                type: "boolean"
            },
        },
    },
];
