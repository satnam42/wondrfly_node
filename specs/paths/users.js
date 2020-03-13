module.exports = [
  {
    url: "/register",
    post: {
      summary: "create",
      description: "create",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of user creation",
          required: true,
          schema: {
            $ref: "#/definitions/userCreate"
          }
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
      summary: "get User List",
      description: "get All Users",
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
          name: "role",
          description: "role",
          default: 'all',
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
    url: "/update/{id}",
    put: {
      summary: "Update",
      description: "update user details",
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
          description: "Model of user update",
          required: true,
          schema: {
            $ref: "#/definitions/userUpdate"
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
      summary: "get user",
      description: "get user detail by Id",
      parameters: [
        {
          in: "path",
          name: "id",
          description: "userId",
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
    url: "/login",
    post: {
      summary: "Login user",
      description: "user login into system and get its token to access apis",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of login user",
          required: true,
          schema: {
            $ref: "#/definitions/Login"
          }
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
    url: "/resetPassword",
    post: {
      summary: "Reset Password",
      description: "reset Password",
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
          description: "Model of resetPassword user",
          required: true,
          schema: {
            $ref: "#/definitions/resetPassword"
          }
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
    url: "/uploadProfilePic",
    post: {
      summary: "upload Profile Pic ",
      description: "upload Profile Pic ",
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
  //   url: "/addAddress",
  //   post: {
  //     summary: "add",
  //     description: "add-address",
  //     parameters: [
  //       {
  //         in: "body",
  //         name: "body",
  //         description: "Model of addAdress creation",
  //         required: true,
  //         schema: {
  //           $ref: "#/definitions/addAddress"
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
  //   url: "/addressList/{id}",
  //   get: {
  //     summary: "addressList",
  //     description: "get address list  by userId",
  //     parameters: [
  //       {
  //         in: "path",
  //         name: "id",
  //         description: "userId",
  //         required: true,
  //         type: "string"
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
  // {
  //   url: "/addressUpdate/{id}",
  //   put: {
  //     summary: "addressUpdate ",
  //     description: "update address details",
  //     parameters: [
  //       {
  //         in: "path",
  //         name: "id",
  //         description: "address id",
  //         required: true,
  //         type: "string"
  //       },
  //       {
  //         in: "body",
  //         name: "body",
  //         description: "Model of address update",
  //         required: true,
  //         schema: {
  //           $ref: "#/definitions/addressUpdate"
  //         }
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
