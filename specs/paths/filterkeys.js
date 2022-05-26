module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "filterkeys post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of filterkeys creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-filterkey"
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
            summary: "get filterkeys list",
            description: "get filterkeys list",
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
        url: "/update{id}",
        put: {
            summary: "Update",
            description: "update filterkeys details",
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'filterkey id',
                    required: true,
                    type: 'string',
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of filterkeys creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/update-filterkey"
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