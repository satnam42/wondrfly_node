module.exports = [
    {
        url: "/request",
        post: {
            summary: "request",
            description: "request for claim",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of claimRequest creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/claimRequest"
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
        url: "/requestList",
        get: {
            summary: "get claim request list",
            description: "get claim request list",
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
        url: "/requestListByProvider",
        get: {
            summary: "ListByProvider",
            description: " claim request List By Provider",
            parameters: [
                {
                    in: "query",
                    name: "id",
                    description: "provider id",
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
        url: "/action/{id}",
        put: {
            summary: "action On claim",
            description: "action On claim request",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "claimId",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of claimRequest creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/claimRequest"
                    }
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
]