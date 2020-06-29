module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add child",
            parameters: [
                {


                    in: "body",
                    name: "body",
                    description: "Model of child creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/childAdd"
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
            summary: "get child List",
            description: "get All child",
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
            description: "update child details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "child id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of child update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/childAdd"
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
            summary: "get children by parent id",
            description: "get children by parent id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "child id",
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
    {
        url: "/delete/{id}",
        put: {
            summary: "delete child",
            description: "delete child by id",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "child id",
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
        url: "/uploadChildPic",
        post: {
            summary: "upload child Pic ",
            description: "upload child Pic ",
            parameters: [
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
