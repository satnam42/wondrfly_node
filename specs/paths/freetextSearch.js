module.exports = [
    {
        url: "/search",
        get: {
            summary: "get freetext search",
            description: "free text search",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "text",
                    description: "freetext search name",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "parentId",
                    description: "parent Id",
                    required: true
                }
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
        url: "/list",
        get: {
            summary: "get list",
            description: "get free text search list",
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
        url: "/listByParentId/{id}",
        get: {
            summary: "get free text search by parent id",
            description: "get free text search by parent id",
            parameters: [

                {
                    in: "path",
                    name: "id",
                    description: "parent id",
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
        url: "/remove/{id}",
        delete: {
            summary: "Delete",
            description: "Delete free text search",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "free text search id",
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