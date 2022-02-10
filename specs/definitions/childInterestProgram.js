module.exports = [
    {
        name: "childInterestProgram",
        properties: {
            child: {
                type: 'array',
                items: {
                    properties: {
                        id: { type: 'string' },
                    }
                }
            }
        }
    }
];