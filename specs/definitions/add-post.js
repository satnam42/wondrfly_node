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
            tagIds: {
                type: 'array',
                items: {
                    // type: 'array',
                    type: "string", default: ""
                    // properties:
                    //     { type: "string", default: "" },

                }
            },
            userId: {
                type: "string"
            },
            postFor: {
                type: "string",
                enum: ["provider", "parent", "all"]
            }
            // comments: {
            //     type: 'array',
            //     items: {
            //         // type: 'array',
            //         type: "string", default: ""
            //         // properties:
            //         //     { type: "string", default: "" },

            //     }
            // },
        }
    }
];


