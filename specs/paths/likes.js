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
        url: "/unLike",
        put: {
            summary: "unlike",
            description: "unLike post",
            parameters: [
                {
                    in: "query",
                    name: "postId",
                    description: "postId",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "userId",
                    description: "userId",
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