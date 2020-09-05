module.exports = [
    {
        name: "claimRequest",
        properties: {
            requestOn: {
                type: "string"
            },
            requestBy: {
                type: "string"
            },
            status: {
                type: "string",
                enum: ['approve', 'reject', 'in-progress'],
                default: 'in-progress'
            },
        }
    }
];



