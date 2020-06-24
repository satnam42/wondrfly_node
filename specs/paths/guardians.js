module.exports = [
    {
        url: "/add",
        post: {
            summary: "add",
            description: "add guardian",
            parameters: [
                {


                    in: "body",
                    name: "body",
                    description: "Model of guardian creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/guardianAdd"
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
            summary: "get guardian List",
            description: "get All guardian",
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
            description: "update guardian details",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "guardian id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of guardian update",
                    required: true,
                    schema: {
                        $ref: "#/definitions/guardianAdd"
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
    //         summary: "delete guardian",
    //         description: "delete guardian by id",
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
    //                 description: "guardian id",
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
