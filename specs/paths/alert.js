module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "alert post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of alert creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-alert"
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
            summary: "get alerts list",
            description: "get alerts list",
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
        url: "/update",
        put: {
            summary: "Update",
            description: "update alert details",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of alert creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/update-alert"
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
        url: "/deleteAlert/{id}",
        delete: {
            summary: "Delete",
            description: "Delete alert",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "alert id",
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