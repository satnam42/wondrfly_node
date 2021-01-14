module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "create post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of subscription plan creation.",
                    required: true,
                    schema: {
                        $ref: "#/definitions/createPlan"
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
    },

    {
        url: "/list",
        get: {
            summary: "get plans list",
            description: "get plans list",
            parameters: [

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