module.exports = [
    // {
    //     url: "/add",
    //     post: {
    //         summary: "add",
    //         description: "add guardian",
    //         parameters: [
    //             {
    //                 in: "body",
    //                 name: "body",
    //                 description: "Model of guardian creation",
    //                 required: true,
    //                 schema: {
    //                     $ref: "#/definitions/guardianAdd"
    //                 }
    //             }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },
    {
        url: "/list",
        get: {
            summary: "get guardian List",
            description: "get All guardian",
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
        url: "/update/{id}",
        put: {
            summary: "Update",
            description: "update guardian details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "guardian id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of guardian update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/guardianAdd"
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
        url: "/byParentId/{id}",
        get: {
            summary: "byParentId",
            description: "get guardian by parent id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "parent id",
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
    }, {
        url: "/remove/{id}",
        delete: {
            summary: "delete",
            description: "delete guardian ",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "guardian id",
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

    // {
    //     url: "/sendOtp",
    //     post: {
    //         summary: "otp",
    //         description: "send otp when adding guardian",
    //         parameters: [
    //             {
    //                 in: "body",
    //                 name: "body",
    //                 description: "Model of guardian otp",
    //                 required: true,
    //                 schema: {
    //                     $ref: "#/definitions/guardianOtp"
    //                 }
    //             },
    //             {
    //                 in: "header",
    //                 name: "x-access-token",
    //                 description: "token to access api",
    //                 required: true,
    //                 type: "string"
    //             },
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },
    {
        url: "/activeOrDeactive",
        put: {
            summary: "activeOrDeactive ",
            description: "activeOrDeactive guardian by id",
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
                    type: "string",
                    name: "id",
                    description: "guardian id",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "isActivated",
                    description: "true,false",
                    required: true
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
        url: "/inviteToJoin",
        post: {
            summary: "inviteToJoin",
            description: "inviteToJoin",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of invite guardian to join",
                    required: true,
                    schema: {
                        $ref: "#/definitions/guardian-inviteJoin"
                    }
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
        url: "/askToJoin",
        post: {
            summary: "askToJoin",
            description: "askToJoin",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of ask to join",
                    required: true,
                    schema: {
                        $ref: "#/definitions/askToJoin"
                    }
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