module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "badge post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of badge creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-badge"
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
            summary: "get badges list",
            description: "get badges list",
            parameters: [

                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: true,
                //     type: "string"
                // }
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
        url: "/update",
        put: {
            summary: "Update",
            description: "update badge details",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of alert creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/update-badge"
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
        url: "/deleteBadge/{id}",
        delete: {
            summary: "Delete",
            description: "Delete badge",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "badge id",
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
    }

]