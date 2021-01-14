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
  // {
  //   url: "/update/{id}",
  //   put: {
  //     summary: "Update",
  //     description: "update user details",
  //     parameters: [
  //       {
  //         in: "path",
  //         name: "id",
  //         description: "user id",
  //         required: true,
  //         type: "string"
  //       },
  //       {
  //         in: "body",
  //         name: "body",
  //         description: "Model of user update",
  //         required: true,
  //         schema: {
  //           $ref: "#/definitions/userUpdate"
  //         }
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
        // {
        //   in: "header",
        //   name: "x-access-token",
        //   description: "token to access api",
        //   required: true,
        //   type: "string"
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
    url: "/resetPassword/{id}",
    put: {
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
          in: "path",
          name: "id",
          description: "user id",
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
    url: "/uploadProfilePic/{id}",
    put: {
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
          in: "path",
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
    url: "/delete",
    put: {
      summary: "delete user",
      description: "delete user by id",
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
          description: "user id",
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
    url: "/activeOrDeactive",
    put: {
      summary: "activeOrDeactive ",
      description: "activeOrDeactive user by id",
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
          description: "user id",
          required: true
        },
        {
          in: "query",
          type: "string",
          name: "isActivated",
          description: "true,false",
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
    url: "/count",
    get: {
      summary: "get User count",
      description: "count of user",
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
    url: "/recentAddedByRole",
    get: {
      summary: "get recent added 5 user by role",
      description: "get recent added",
      parameters: [
        {
          in: "query",
          type: "string",
          name: "role",
          description: "admin,provider,parent,child",
          required: true
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
    url: "/recentAdded",
    get: {
      summary: "get recent added 5 user",
      description: "get recent added",
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
    url: "/otp",
    get: {
      summary: "get otp",
      description: "get otp",
      parameters: [
        {
          in: "query",
          type: "string",
          name: "email",
          description: "email",
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
    url: "/otpVerify",
    post: {
      summary: "Verify otp",
      description: "Verify otp",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of verifyToken",
          required: true,
          schema: {
            $ref: "#/definitions/verifyToken"
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
    url: "/forgotPassword",
    post: {
      summary: "forgotPassword",
      description: "forgotPassword",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of forgotPassword",
          required: true,
          schema: {
            $ref: "#/definitions/forgotPassword"
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
    url: "/tellAFriend",
    post: {
      summary: "tellAFriend",
      description: "tell A Friend",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of tellAFriend ",
          required: true,
          schema: {
            $ref: "#/definitions/tellAFriend"
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
    url: "/feedback",
    post: {
      summary: "feedback",
      description: "add feedback",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Model of feedback ",
          required: true,
          schema: {
            $ref: "#/definitions/addFeedback"
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
    url: "/getProfileProgress",
    get: {
      summary: "get User Profile Progress",
      description: "get User Profile Progress by id and role",
      parameters: [
        {
          in: "query",
          type: "string",
          name: "id",
          description: "userId",
          required: true
        },
        {
          in: "query",
          type: "string",
          name: "role",
          description: "user role like parent or provider etc",
          required: true
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
    url: "/verifySecuirtyAns/{id}",
    put: {
      summary: "verify Secuirty Ans",
      description: "verify Secuirty Ans by userId",
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
          name: "id",
          description: "user id",
          required: true,
          type: "string"
        },
        {
          in: "body",
          name: "body",
          description: "Model of securityAns user",
          required: true,
          schema: {
            $ref: "#/definitions/securityAns"
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
    url: '/forgotPasswordVerifyEmail',
    post: {
      summary: 'verify email',
      description: 'when user forgot password verify registered email',
      parameters: [{
        in: 'body',
        name: 'body',
        description: 'Model of verify registerd email for forgot password',
        required: true,
        schema: {
          $ref: '#/definitions/verifyEmail'
        }
      }],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error'
          }
        }
      }
    }
  },
];
