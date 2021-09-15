module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "feedback post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of feedback",
                    required: true,
                    schema: {
                        $ref: "#/definitions/addFeedback"
                    }
                },
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
            summary: "get feedback list",
            description: "get feedback list",
            // parameters: [
            //     {
            //         in: "header",
            //         name: "x-access-token",
            //         description: "token to access api",
            //         required: true,
            //         type: "string"
            //     }
            // ],
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
            description: "update feedback",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of feedback creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/update-feedback"
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
        url: "/deleteFeedback/{id}",
        delete: {
            summary: "Delete",
            description: "Delete feedback",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "feedback id",
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