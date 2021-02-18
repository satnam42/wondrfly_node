module.exports = [

    {
        name: "eventCreate",
        properties: {
            title: {
                type: "string"
            },
            description: {
                type: "string"
            },
            date: {
                properties: {
                    to: { type: "date" },
                    from: { type: "date" }
                }
            },
            userId: {
                type: "string"
            },
        }
    }
];
