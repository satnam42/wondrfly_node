module.exports = [
    {
        url: "/deleteNotification",
        delete: {
            summary: "Remove",
            description: "Remove Notification",
            parameters: [
                {
                    in: "query",
                    name: "id",
                    description: "notification id",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "userId",
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
    },
]