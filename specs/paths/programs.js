module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add program",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of program creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/programAdd"
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
    {
        url: "/list",
        get: {
            summary: "get program List",
            description: "get All program",
            parameters: [
                {
                    in: "query",
                    type: "integer",
                    name: "pageNo",
                    description: "pageNo",
                    required: true
                },
                {
                    in: "query",
                    type: "integer",
                    name: "pageSize",
                    description: "pageSize",
                    required: true
                }, {
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
            description: "update program details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "program id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of program update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/programAdd"
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
        url: "/getById/{id}",
        get: {
            summary: "getById",
            description: "program details by id ",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "program id",
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
        url: "/delete/{id}",
        delete: {
            summary: "delete",
            description: "delete program by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "program id",
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
            summary: "search",
            description: "program search  ",
            parameters: [
                {
                    in: "query",
                    name: "name",
                    description: "program name",
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
        url: "/byProvider",
        get: {
            summary: "byProvider",
            description: "program by Provider id ",
            parameters: [
                {
                    in: "query",
                    name: "userId",
                    description: "user id",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    type: "integer",
                    name: "pageNo",
                    description: "pageNo",
                    required: true
                },
                {
                    in: "query",
                    type: "integer",
                    name: "pageSize",
                    description: "pageSize",
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
        url: "/addClick",
        post: {
            summary: "addClick",
            description: "add Click",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of click creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/clickAdd"
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
    {
        url: "/addView",
        post: {
            summary: "addView",
            description: "add view",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of view creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/viewAdd"
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
    {
        url: "/getViewsCount",
        get: {
            summary: "getViewsCount",
            description: "program view count ",
            parameters: [
                {
                    in: "query",
                    name: "userId",
                    description: "user id",
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
        url: "/count",
        get: {
            summary: "count",
            description: "provider program  count ",
            parameters: [
                {
                    in: "query",
                    name: "userId",
                    description: "user id",
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

];
