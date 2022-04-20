module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add in favourites",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of favourite creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/favouriteAdd"
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
            summary: "get favourites list",
            description: "get favourites list",
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
        url: "/delete/{id}",
        delete: {
            summary: "delete",
            description: "delete favourite by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "program id",
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
    {
        url: "/getByParentId",
        get: {
            url: "/getByParentId",
            summary: "get favourites by parentid",
            description: "get favourites list by parentid",
            parameters: [
                {
                    in: "query",
                    name: "parentId",
                    description: "parentId",
                    required: true,
                    type: "string"
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
        url: "/savedProvidersUserId",
        get: {
            url: "/savedProvidersUserId",
            summary: "get favourites providers and parents by parentid",
            description: "get favourites list of providers and parents by parentid",
            parameters: [
                {
                    in: "query",
                    name: "parentId",
                    description: "parentId",
                    required: true,
                    type: "string"
                },
                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: true,
                //     type: "string"
                // },
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