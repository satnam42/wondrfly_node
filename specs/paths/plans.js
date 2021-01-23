module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "create post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of subscription plan creation.",
                    required: true,
                    schema: {
                        $ref: "#/definitions/createPlan"
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
            summary: "get plans list",
            description: "get plans list",
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
        url: "/getById/{id}",
        get: {
            summary: "get plan",
            description: "get plan detail by Id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "planId",
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
        url: "/update/{id}",
        put: {
            summary: "Update",
            description: "update plan details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "plan id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of plan creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/createPlan"
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
        url: "/remove/{id}",
        delete: {
            summary: "Delete",
            description: "Delete plan",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "plan id",
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
        url: "/updateStatus/{id}",
        put: {
            summary: "Update plan status",
            description: "update plan status active/inactive.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "plan id",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "status",
                    description: "task status 'active/inactive'",
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