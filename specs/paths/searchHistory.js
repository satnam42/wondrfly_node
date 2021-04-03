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
    }
]