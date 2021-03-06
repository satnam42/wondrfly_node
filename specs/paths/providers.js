module.exports = [
    {
        url: "/import",
        post: {
            summary: "upload  provider xlsx ",
            description: "upload provider xlsx ",
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
        url: "/list",
        get: {
            summary: "get provider list",
            description: "get provider list",
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
            description: "update provider details",
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
                    description: "Model of provider update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/providerUpdate"
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
        url: "/uploadBannerPic/{id}",
        put: {
            summary: "upload banners ",
            description: "upload banners  ",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "user id",
                    required: true,
                    type: "string"
                },
                {
                    in: "formData",
                    name: "image",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "formData",
                    name: "image",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "formData",
                    name: "image",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "formData",
                    name: "image",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "formData",
                    name: "image",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
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
            description: "getById provider details",
            parameters: [
                {
                    in: "path",
                    name: "id",
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
        url: "/search",
        get: {
            summary: "search",
            description: "search provider by name ",
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
                    name: "name",
                    description: "name",
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
        url: "/byEmialId",
        get: {
            summary: "get provider by email",
            description: "get provider",
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
                    name: "email",
                    description: "email",
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
        url: "/add",
        post: {
            summary: "add Provider",
            description: "add Provider",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of  Provider",
                    required: true,
                    schema: {
                        $ref: "#/definitions/providerCreate"
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
        url: "/report",
        get: {
            summary: "get provider report",
            description: "get report",
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
                    name: "fromDate",
                    description: "toDate",
                    type: "string"
                },
                {
                    in: "query",
                    name: "toDate",
                    description: "toDate",
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
        url: "/listByFilter",
        get: {
            summary: "get provider list according to filter",
            description: "get provider list",
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
                    name: "city",
                    description: "city",
                    type: "string"
                },

                {
                    in: "query",
                    name: "state",
                    description: "state",
                    type: "state"
                },
                {
                    in: "query",
                    name: "country",
                    description: "country",
                    type: "string"
                },
                {
                    in: "query",
                    name: "source",
                    description: "source",
                    type: "string"
                },
                {
                    in: "query",
                    name: "type",
                    description: "type",
                    type: "string"
                },
                {
                    in: "query",
                    name: "sex",
                    description: "sex",
                    // required: true,
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
        url: "/findDuplicate",
        get: {
            summary: "get duplicate provider list ",
            description: "List",
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
                    name: "email",
                    description: "email",
                    type: "string"
                },
                {
                    in: "query",
                    name: "name",
                    description: "name",
                    type: "string"
                },
                {
                    in: "query",
                    name: "phoneNumber",
                    description: "phoneNumber",
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
        url: "/margeDuplicate",
        post: {
            summary: "Marge duplicate provider",
            description: "Marge",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of provider update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/duplicate-provider"
                    }
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
        url: "/getProvidersByDate",
        get: {
            summary: "get Provider's list date wise",
            description: "get Provider's list date wise",
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
        url: "/govtId",
        post: {
            summary: "Govt id upload",
            description: "Govt id upload",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of provider's Govt id upload",
                    required: true,
                    schema: {
                        $ref: "#/definitions/govtId"
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
        url: "/deletePhoneNumber",
        post: {
            summary: "delete provider's phone number",
            description: "delete provider's phone number",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "id",
                    description: "user id",
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
        url: "/isVerifiedOrNot",
        get: {
            summary: "get list of verified or unverified providers",
            description: "get provider list of verified or unverified providers",
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
                    name: "type",
                    description: "type can be verified or unverified",
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
        url: "/searchVerifiedOrUnverified",
        get: {
            summary: "search Verified Or Unverified provider",
            description: "search verified or unverified provider by name",
            parameters: [
                {
                    in: "query",
                    name: "name",
                    description: "name",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "type",
                    description: "type can be verified or unverified",
                    required: true,
                    type: "string"
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
        url: "/getRatingByUser/{id}",
        get: {
            summary: "get rating",
            description: "getRatingByUser",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "user id",
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
        url: "/uploadExcel",
        post: {
            summary: "upload ",
            description: "upload excel sheet data",
            parameters: [
                {
                    in: "formData",
                    name: "csv",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
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
        url: '/montclairProviders',
        get: {
            summary: 'Montclair providers',
            description: 'get list of all montclair providers',
            parameters: [
                {
                    in: 'query',
                    type: 'integer',
                    name: 'pageNo',
                    description: 'pageNo',
                    required: true,
                },
                {
                    in: 'query',
                    type: 'integer',
                    name: 'pageSize',
                    description: 'pageSize',
                    required: true,
                }
            ],
            responses: {
                default: {
                    description: 'Unexpected error',
                    schema: {
                        $ref: '#/definitions/Error',
                    },
                },
            },
        },
    },
    {
        url: '/histogram',
        get: {
            summary: 'histogram',
            description: 'get providers data to show in histogram',
            parameters: [
                {
                    in: 'query',
                    name: 'period',
                    description: 'week, month, quarter, semiYear, year',
                    type: 'string',
                }
            ],
            responses: {
                default: {
                    description: 'Unexpected error',
                    schema: {
                        $ref: '#/definitions/Error',
                    },
                },
            },
        },
    },
    {
        url: "/saveProvider",
        post: {
            summary: "saveProvider",
            description: "add in favourites",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of favourite creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/saveProvider"
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
        url: '/freeTrail',
        put: {
            summary: 'freeTrail the progvider',
            description: 'freeTrail the provider',
            parameters: [
                {
                    in: 'query',
                    type: 'string',
                    name: 'userId',
                    description: 'user Id',
                    required: true,
                },
                {
                    in: 'query',
                    type: 'boolean',
                    name: 'isFreeTrial',
                    description: 'isFreeTrial should be true or false',
                    default: true,
                    required: true,
                },
                {
                    in: 'header',
                    name: 'x-access-token',
                    description: 'token to access api',
                    required: true,
                    type: 'string',
                },
            ],
            responses: {
                default: {
                    description: 'Unexpected error',
                    schema: {
                        $ref: '#/definitions/Error',
                    },
                },
            },
        },
    },
    {
        url: "/searchCreateModifiedDate",
        get: {
            summary: "search by created or modified date",
            description: "search by created or modified date",
            parameters: [
                {
                    in: "query",
                    name: "date",
                    description: "created or modified date",
                    required: true,
                    type: "date"
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
        url: "/getByUsername/{username}",
        get: {
            summary: "getByUsername",
            description: "getByUsername provider details",
            parameters: [
                {
                    in: "path",
                    name: "username",
                    description: "user name",
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
        url: "/activePrograms",
        get: {
            summary: "get provider list with active programs",
            description: "get provider list with active programs",
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
    }

]
