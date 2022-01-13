module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "create/add a role",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of alert creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-role"
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
            summary: "get roles list",
            description: "get roles list",
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