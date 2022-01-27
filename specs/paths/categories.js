module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add category",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of category creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/categoryAdd"
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
            summary: "get category list",
            description: "get category list",
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
        url: "/search",
        get: {
            summary: "get category by search",
            description: "category  by search",
            parameters: [

                {
                    in: "query",
                    type: "string",
                    name: "name",
                    description: "category name",
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
        url: "/update/{id}",
        put: {
            summary: "Update",
            description: "update category details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "category id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of category update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/categoryAdd"
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
        url: "/uploadPic/{id}",
        put: {
            summary: "upload category Pic ",
            description: "upload category Pic ",
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
                    description: "category id",
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
        url: "/delete/{id}",
        delete: {
            summary: "delete",
            description: "delete category by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "category id",
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
            description: "activeOrDeactive category by id",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "id",
                    description: "category id",
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
        url: "/uploadIcon/{id}",
        put: {
            summary: "upload category icon",
            description: "upload category icon",
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
                    description: "category id",
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
            summary: "upload category logo",
            description: "upload category logo",
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
                    description: "category id",
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
            summary: "upload category pattern",
            description: "upload category pattern",
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
                    description: "category id",
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
    }
]