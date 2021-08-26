module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "suggestion post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of suggestion creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/create-suggestion"
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
        url: "/bySubcategoryId/{id}",
        get: {
            summary: "suggestions by subcategory Id",
            description: "suggestions by subcategory Id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "subcategory id",
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