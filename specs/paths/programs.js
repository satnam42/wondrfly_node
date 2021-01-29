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
        url: "/addProgramAction",
        post: {
            summary: "addProgramAction ",
            description: "add Program Action like click ,view favourite",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of view creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/programActionCounterAdd"
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
    {
        url: "/activeOrDecactive",
        put: {
            summary: "activeOrDecactive",
            description: "set program status active or inactive ",
            parameters: [
                {
                    in: "query",
                    name: "id",
                    description: "program id",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "status",
                    description: "active/inactive",
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
        url: "/getGraphData",
        get: {
            summary: "activeOrDecactive",
            description: "set program status active or inactive ",
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
        url: "/byFilter",
        get: {
            summary: "filter",
            description: "get programd bby filter ",
            parameters: [
                {
                    in: "query",
                    name: "fromDate",
                    description: "fromDate",
                    // required: true,
                    type: "date"
                },
                {
                    in: "query",
                    name: "toDate",
                    description: "toDate",
                    // required: true,
                    type: "date"
                },
                {
                    in: "query",
                    name: "toTime",
                    description: "toTime",
                    // required: true,
                    type: "date"
                },
                {
                    in: "query",
                    name: "fromTime",
                    description: "fromTime",
                    // required: true,
                    type: "date"
                },
                {
                    in: "query",
                    name: "ageFrom",
                    description: "ageFrom",
                    type: "integer"
                },
                {
                    in: "query",
                    name: "ageTo",
                    description: "ageTo",
                    type: "integer"
                },
                {
                    in: "query",
                    name: "priceFrom",
                    description: "priceFrom",
                    type: "integer"
                },
                {
                    in: "query",
                    name: "priceTo",
                    description: "priceTo",
                    type: "integer"
                },
                {
                    in: "query",
                    name: "categoryId",
                    description: "category id",
                    type: "string"
                },
                {
                    in: "query",
                    name: "pageSize",
                    description: "pageSize",
                    type: "integer"
                },
                {
                    in: "query",
                    name: "pageNo",
                    description: "pageNo",
                    type: "integer"
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
        url: "/import",
        post: {
            summary: "upload  program csv ",
            description: "upload program csv ",
            parameters: [
                {
                    in: "formData",
                    name: "csv",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
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
        url: "/getProgramsByDate",
        get: {
            summary: "get Program's list date wise",
            description: "get Program's list date wise",
            parameters: [
                {
                    in: "query",
                    name: "fromDate",
                    description: "Date belongs From date",
                    type: "string"
                },
                {
                    in: "query",
                    name: "toDate",
                    description: "Date belongs To date",
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
        url: "/publishedOrUnPublishedPrograms",
        get: {
            summary: "publishedOrUnPublishedPrograms",
            description: "Publish program details by user ID",
            parameters: [
                {
                    in: "query",
                    name: "userId",
                    description: "user Id",
                    type: "string"
                },
                {
                    in: "query",
                    name: "programType",
                    description: "program type can be published or unpublished",
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
        url: "/openPrograms",
        get: {
            summary: "get open programs List",
            description: "get open programs",
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
        url: "/publish",
        put: {
            summary: "published the program",
            description: "published the program",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "programId",
                    description: "program Id",
                    required: true
                },
                {
                    in: "query",
                    type: "boolean",
                    name: "isPublished",
                    description: "isPublished should be true or false",
                    default: true,
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
        url: "/listPublishOrUnpublish",
        get: {
            summary: "list of published or unpublished programs",
            description: "list of published or unpublished programs",
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
                },
                {
                    in: "query",
                    type: "string",
                    name: "programType",
                    description: "program type can be published or unpublished",
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
        url: "/searchByNameAndDate",
        get: {
            summary: "search activities",
            description: "search programs by name or date or by both",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "programName",
                    description: "program name",
                },
                {
                    in: "query",
                    type: "string",
                    name: "date",
                    description: "date when program created",
                }, {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
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
];
