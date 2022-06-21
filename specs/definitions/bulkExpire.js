module.exports = [
    {
        name: 'bulkExpire',
        properties: {
            programIds: {
                type: 'array',
                items: {
                    type: 'string',
                },
            }
        },
    },
];
