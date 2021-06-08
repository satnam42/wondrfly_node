module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "feedback post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of feedback",
                    required: true,
                    schema: {
                        $ref: "#/definitions/addFeedback"
                    }
                },
                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: true,
                //     type: "string"
                // }
            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },
    {
        url: "/list",
        get: {
            summary: "get feedback list",
            description: "get feedback list",
            // parameters: [
            //     {
            //         in: "header",
            //         name: "x-access-token",
            //         description: "token to access api",
            //         required: true,
            //         type: "string"
            //     }
            // ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    }
]    