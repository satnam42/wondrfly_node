module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add tag",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of tag creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/tagAdd"
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
            summary: "get tag list",
            description: "get tag list",
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
        url: "/byCategoryId",
        get: {
            summary: "get tag by categoryId",
            description: "get tag by categoryId",
            parameters: [
                // {
                //     in: "header",
                //     name: "x-access-token",
                //     description: "token to access api",
                //     required: true,
                //     type: "string"
                // },
                {
                    in: "query",
                    name: "catrgoryIds",
                    description: "catrgoryIds",
                    required: true,
                    type: "array"
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
            description: "update tag details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "user id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of tag update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/tagAdd"
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
        url: "/search",
        get: {
            summary: "get tags by search",
            description: "tags  by search",
            parameters: [

                {
                    in: "query",
                    type: "string",
                    name: "name",
                    description: "tags name",
                    required: true
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
            description: "Delete alert",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "tag id",
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
        url: "/activeOrDeactive",
        put: {
            summary: "activeOrDeactive ",
            description: "activeOrDeactive tag by id",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "id",
                    description: "tag id",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "isActivated",
                    description: "true,false",
                    required: true
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
        url: "/uploadImage/{id}",
        put: {
            summary: "upload tag image",
            description: "upload tag image",
            parameters: [
                {
                    in: "formData",
                    name: "image",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "tag id",
                    required: true
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
        url: "/uploadIcon/{id}",
        put: {
            summary: "upload tag icon",
            description: "upload tag icon",
            parameters: [
                {
                    in: "formData",
                    name: "icon",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "tag id",
                    required: true
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
        url: "/uploadLogo/{id}",
        put: {
            summary: "upload tag logo",
            description: "upload tag logo",
            parameters: [
                {
                    in: "formData",
                    name: "logo",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "tag id",
                    required: true
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
        url: "/uploadPattern/{id}",
        put: {
            summary: "upload tag pattern",
            description: "upload tag pattern",
            parameters: [
                {
                    in: "formData",
                    name: "pattern",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "tag id",
                    required: true
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
        url: "/searchTags",
        get: {
            summary: "get tags by search",
            description: "tags  by search",
            parameters: [

                {
                    in: "query",
                    type: "string",
                    name: "name",
                    description: "tags name",
                    required: true
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