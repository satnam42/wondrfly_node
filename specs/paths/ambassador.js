module.exports = [
    {
        url: "/addOrRemove",
        post: {
            summary: "add or remove ambasssdor",
            description: "add or remove ambasssdor",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of Add or remove ambassdor",
                    required: true,
                    schema: {
                        $ref: "#/definitions/addRemove-ambassador"
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
        url: "/getAmbassadors",
        get: {
            summary: "get ambassadors list",
            description: "get ambassadors list",
            parameters: [
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
        url: "/addActivities",
        post: {
            summary: "add",
            description: "add activity",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of activity creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/activitiesAdd"
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
        url: "/getActivities",
        get: {
            summary: "get activities list",
            description: "get activities list",
            parameters: [
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