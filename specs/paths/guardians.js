module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add guardian",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of guardian creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/guardianAdd"
                    }
                },
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
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
            summary: "get guardian List",
            description: "get All guardian",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
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
            description: "update guardian details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "guardian id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of guardian update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/guardianAdd"
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
        url: "/byParentId/{id}",
        get: {
            summary: "byParentId",
            description: "get guardian by parent id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "guardian id",
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