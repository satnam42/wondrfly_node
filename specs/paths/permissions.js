module.exports = [
    {
        url: "/create",
        post: {
            summary: "add Permission ",
            description: "add Permission",
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
        url: "/assign",
        post: {
            summary: "assign Permission ",
            description: "assign Permission ",
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
        url: "/delete",
        put: {
            summary: "delete Permission ",
            description: "delete Permission ",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    type: "string",
                    name: "userId",
                    description: "user id",
                    required: true
                },
                // {
                //     in: "query",
                //     type: "string",
                //     name: "entityId",
                //     description: "entity id",
                //     required: true
                // },
                {
                    in: "query",
                    type: "string",
                    name: "permissionTypeId",
                    description: "permissionType id",
                    required: true
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
        url: "/typeList",
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