module.exports = [

    {
        url: "/search",
        get: {
            summary: "search reports",
            description: "search reports",
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
                    name: "fromDate",
                    description: "toDate",
                    type: "string"
                },
                {
                    in: "query",
                    name: "toDate",
                    description: "toDate",
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