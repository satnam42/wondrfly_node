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
            tagId: {
                type: "string"
            },
            userId: {
                type: "string"
            },
            commentIds: {
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


