module.exports = [

    {
        name: "add-post",
        properties: {
            title: {
                type: "string"
            },
            description: {
                type: "string"
            },
            tags: {
                type: "string"
            },
            user: {
                type: "string"
            },
            comments: {
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


