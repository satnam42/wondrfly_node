module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "search topic post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of search topic creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-searchtopic"
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
            summary: "get search topic list",
            description: "get search topic list",
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
        url: "/update/{id}",
        put: {
            summary: "Update",
            description: "update search topic details",
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'search topic id',
                    required: true,
                    type: 'string',
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of search topic creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-searchtopic"
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
            description: "Delete search topic",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "search topic id",
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
        url: "/search",
        get: {
            summary: "get search topic by search",
            description: "search topic  by search",
            parameters: [

                {
                    in: "query",
                    type: "string",
                    name: "name",
                    description: "search topic name",
                    required: true
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
        url: "/activeOrDeactive",
        put: {
            summary: "activeOrDeactive ",
            description: "activeOrDeactive search topic by id",
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
                    description: "search topic id",
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
        url: "/getByName/{name}",
        get: {
            summary: "getByName",
            description: "getByName topic details",
            parameters: [
                {
                    in: "path",
                    name: "name",
                    description: "topic name",
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