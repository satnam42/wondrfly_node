module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "add comment",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of comment creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-comment"
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
        url: "/update/{id}",
        put: {
            summary: "Update",
            description: "update comment details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "comment id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of comment update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-comment"
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
        url: "/remove/{id}",
        put: {
            summary: "delete",
            description: "delete comment",
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