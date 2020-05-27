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
    // {
    //   url: "/list",
    //   get: {
    //     summary: "get User List",
    //     description: "get All Users",
    //     parameters: [
    //       {
    //         in: "query",
    //         type: "integer",
    //         name: "pageNo",
    //         description: "pageNo",
    //         required: true
    //       },
    //       {
    //         in: "query",
    //         type: "integer",
    //         name: "pageSize",
    //         description: "pageSize",
    //         required: true
    //       },
    //       {
    //         in: "query",
    //         type: "string",
    //         name: "role",
    //         description: "role",
    //         default: 'all',
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
    //   url: "/uploadProfilePic",
    //   post: {
    //     summary: "upload Profile Pic ",
    //     description: "upload Profile Pic ",
    //     parameters: [
    //       {
    //         in: "formData",
    //         name: "image",
    //         type: "file",
    //         description: "The file to upload.",
    //         required: true,
    //       },
    //       {
    //         in: "header",
    //         name: "x-access-token",
    //         description: "token to access api",
    //         required: true,
    //         type: "string"
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
    {
        url: "/delete",
        put: {
            summary: "delete parent",
            description: "delete parent by id",
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
                    description: "parent id",
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
