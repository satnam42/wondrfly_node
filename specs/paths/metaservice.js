module.exports = [
    {
        url: "/create",
        post: {
            summary: "create",
            description: "add-metaservice post",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of meta service creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-metaservice"
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
            summary: "get meta service list",
            description: "get meta service list",
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
            description: "update meta service details",
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'meta service id',
                    required: true,
                    type: 'string',
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of meta service creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/add-metaservice"
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
            description: "Delete meta service",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "meta service id",
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
    //     url: "/search",
    //     get: {
    //         summary: "get search topic by search",
    //         description: "search topic  by search",
    //         parameters: [

    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "name",
    //                 description: "search topic name",
    //                 required: true
    //             },
    //             // {
    //             //     in: "header",
    //             //     name: "x-access-token",
    //             //     description: "token to access api",
    //             //     required: true,
    //             //     type: "string"
    //             // }

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
    // {
    //     url: "/activeOrDeactive",
    //     put: {
    //         summary: "activeOrDeactive ",
    //         description: "activeOrDeactive search topic by id",
    //         parameters: [
    //             {
    //                 in: "header",
    //                 name: "x-access-token",
    //                 description: "token to access api",
    //                 required: true,
    //                 type: "string"
    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "id",
    //                 description: "search topic id",
    //                 required: true
    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "isActivated",
    //                 description: "true,false",
    //                 required: true
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
    // }
]