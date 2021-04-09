module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "search history create",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of search history creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-search"
                    }
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
        url: "/getsearcHistoryOfUser",
        get: {
            summary: "search history list",
            description: "get search history list",
            parameters: [
                {
                    in: "query",
                    name: "userId",
                    description: "user id",
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
        url: "/deleteSearchById",
        delete: {
            summary: "delete Search By Id",
            description: "Delete search by id ",
            parameters: [
                {
                    in: "query",
                    name: "id",
                    description: "search id",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "userId",
                    description: "user id, who's search is to be delete",
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
        url: "/allClear/{id}",
        delete: {
            summary: "All Clear",
            description: "Clear all search history",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "user id",
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