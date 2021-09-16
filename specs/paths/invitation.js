module.exports = [
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
            summary: "get invitation list",
            description: "get invitation list",
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
        url: "/approveAll",
        post: {
            summary: "approveAll invitations at once",
            description: "approveAll invitations at once",
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
        url: "/approveOrDecline",
        put: {
            summary: "Approve or Decline",
            description: "Approve or Decline the invitation",
            parameters: [
                {
                    in: "query",
                    name: "type",
                    description: "type can be approve or decline",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "id",
                    description: "invitation id",
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
        url: "/inviteToJoin",
        post: {
            summary: "inviteToJoin",
            description: "inviteToJoin",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of invite parent to join",
                    required: true,
                    schema: {
                        $ref: "#/definitions/invite-join"
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
        url: "/listByParentId/{id}",
        get: {
            summary: "get invitations by parent id",
            description: "get invitations by parent id",
            parameters: [

                {
                    in: "path",
                    name: "id",
                    description: "alert id",
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