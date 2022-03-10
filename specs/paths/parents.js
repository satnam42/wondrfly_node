module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add parent",
            parameters: [
                {


                    in: "body",
                    name: "body",
                    description: "Model of parent creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/parentAdd"
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
            summary: "get parent List",
            description: "get All parent",
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
            description: "update parent details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "parent id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of parent update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/parentAdd"
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
            description: "parent by id details",
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
    },
    {
        url: '/searchByNameEmailStatus',
        get: {
            summary: 'search parent',
            description: 'search parent by name or email or status',
            parameters: [
                {
                    in: 'query',
                    type: 'string',
                    name: 'keyType',
                    description: 'name, email, status',
                },
                {
                    in: 'query',
                    type: 'string',
                    name: 'keyValue',
                    description: 'key value',
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
        url: '/createSearchHistory',
        put: {
            summary: 'search history',
            description: 'search history by parent',
            parameters: [
                {
                    in: 'query',
                    type: 'string',
                    name: 'userId',
                    required: true,
                    description: 'user Id',
                },
                {
                    in: 'query',
                    type: 'string',
                    name: 'category',
                    description: 'category id',
                },
                {
                    in: 'query',
                    type: 'string',
                    name: 'subCategory',
                    description: 'subCategory id',
                },
                {
                    in: 'query',
                    type: 'string',
                    name: 'program',
                    description: 'program id',
                },
                {
                    in: 'query',
                    type: 'string',
                    name: 'provider',
                    description: 'provider id',
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
        url: '/searchByNameEmailStatus',
        get: {
            summary: 'search parent',
            description: 'search parent by name or email or status',
            parameters: [
                {
                    in: 'query',
                    type: 'string',
                    name: 'keyType',
                    description: 'name, email, status',
                },
                {
                    in: 'query',
                    type: 'string',
                    name: 'keyValue',
                    description: 'key value',
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
        url: "/getSearchHistory/{id}",
        get: {
            summary: "getById",
            description: "get Search History by parent id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "parent id",
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
    // {
    //   url: "/resetPassword",
    //   post: {
    //     summary: "Reset Password",
    //     description: "reset Password",
    //     parameters: [
    //       {
    //         in: "header",
    //         name: "x-access-token",
    //         description: "token to access api",
    //         required: true,
    //         type: "string"
    //       },
    //       {
    //         in: "body",
    //         name: "body",
    //         description: "Model of resetPassword user",
    //         required: true,
    //         schema: {
    //           $ref: "#/definitions/resetPassword"
    //         }
    //       }
    //     ],
    //     responses: {
    //       default: {
    //         description: "Unexpected error",
    //         schema: {
    //           $ref: "#/definitions/Error"
    //         }
    //       }
    //     }
    //   }
    // },
    // {
    //     url: "/uploadProfilePic",
    //     post: {
    //         summary: "upload Profile Pic ",
    //         description: "upload Profile Pic ",
    //         parameters: [
    //             {
    //                 in: "formData",
    //                 name: "image",
    //                 type: "file",
    //                 description: "The file to upload.",
    //                 required: true,
    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "id",
    //                 description: "user id",
    //                 required: true
    //             },
    //             {
    //                 in: "header",
    //                 name: "x-access-token",
    //                 description: "token to access api",
    //                 required: true,
    //                 type: "string"
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
    // {
    //     url: "/delete",
    //     put: {
    //         summary: "delete parent",
    //         description: "delete parent by id",
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
    //                 description: "parent id",
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
    // },
    // {
    //   url: "/activeOrDeactive",
    //   put: {
    //     summary: "activeOrDeactive ",
    //     description: "activeOrDeactive user by id",
    //     parameters: [
    //       {
    //         in: "header",
    //         name: "x-access-token",
    //         description: "token to access api",
    //         required: true,
    //         type: "string"
    //       },
    //       {
    //         in: "query",
    //         type: "string",
    //         name: "id",
    //         description: "user id",
    //         required: true
    //       },
    //       {
    //         in: "query",
    //         type: "string",
    //         name: "status",
    //         description: "active,inacive",
    //         required: true
    //       },
    //     ],
    //     responses: {
    //       default: {
    //         description: "Unexpected error",
    //         schema: {
    //           $ref: "#/definitions/Error"
    //         }
    //       }
    //     }
    //   }
    // },

];
