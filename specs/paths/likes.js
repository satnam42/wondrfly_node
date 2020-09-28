module.exports = [
    {
        url: "/like",
        post: {
            summary: "create",
            description: "like post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of like creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-like"
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
        url: "/unLike/{id}",
        put: {
            summary: "delete",
            description: "unLike post",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "comment id",
                    required: true,
                    type: "string"
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

]