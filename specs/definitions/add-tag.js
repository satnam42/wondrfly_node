module.exports = [

    {
        name: "tagAdd",
        properties: {
            name: {
                type: "string"
            },
            description: {
                type: "string"
            },
            categoryIds: {
                type: 'array',
                items: {
                    // type: 'array',
                    type: "string", default: ""
                    // properties:
                    //     { type: "string", default: "" },

                }
            },
        }
    }
];


