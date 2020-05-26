module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add category",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of category creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/categoryAdd"
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
            summary: "get category list",
            description: "get category list",
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
        url: "/search",
        get: {
            summary: "get category by search",
            description: "category  by search",
            parameters: [

                {
                    in: "query",
                    type: "string",
                    name: "name",
                    description: "category name",
                    required: true
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
            description: "update category details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "category id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of category update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/categoryAdd"
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