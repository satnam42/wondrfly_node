module.exports = [
    {
        name: "claimRequest",
        properties: {
            providerId: {
                type: "string"
            },
            userId: {
                type: "string"
            },
            programId: {
                type: 'string'
            },
            status: {
                type: "string",
                enum: ['approve', 'reject', 'in-progress'],
                default: 'in-progress'
            },
        }
    }
];



