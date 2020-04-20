module.exports = [
    {
        url: "/assign",
        post: {
            summary: "add Permission ",
            description: "add Permission ",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of Permission creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/permissionCreate"
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
        url: "/addPermissionType",
        post: {
            summary: "add Permission Type",
            description: "add Permission Type",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of PermissionType creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/permissionTypeCreate"
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
            summary: "get PermissionType list",
            description: "get PermissionType list",
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
]