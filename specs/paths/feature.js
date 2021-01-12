module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "add feature",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of feature creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-feature"
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