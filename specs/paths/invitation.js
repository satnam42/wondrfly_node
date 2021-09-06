module.exports = [
    {
        url: "/askToJoin",
        post: {
            summary: "askToJoin",
            description: "askToJoin",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of ask to join",
                    required: true,
                    schema: {
                        $ref: "#/definitions/askToJoin"
                    }
                },
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                }
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
    }
]