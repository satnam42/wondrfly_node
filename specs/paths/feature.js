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
    },
    {
        url: "/list",
        get: {
            summary: "get features list",
            description: "get features list",
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
    },
    {
        url: "/update/{id}",
        put: {
            summary: "Update",
            description: "update feature details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "feature id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of feature update",
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