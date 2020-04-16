// module.exports = [


//     // {
//     //     url: "/byCategories",
//     //     get: {
//     //         summary: "get product by categories",
//     //         description: "product  by categories",
//     //         parameters: [
//     //             {
//     //                 in: "query",
//     //                 type: "integer",
//     //                 name: "pageNo",
//     //                 description: "pageNo",
//     //                 required: true
//     //             },
//     //             {
//     //                 in: "query",
//     //                 type: "integer",
//     //                 name: "pageSize",
//     //                 description: "pageSize",
//     //                 required: true
//     //             },
//     //             {
//     //                 in: "query",
//     //                 type: "array",
//     //                 name: "categories",
//     //                 description: "need a array of categoiers like paint,nails",
//     //                 required: true
//     //             },
//     //         ],
//     //         responses: {
//     //             default: {
//     //                 description: "Unexpected error",
//     //                 schema: {
//     //                     $ref: "#/definitions/Error"
//     //                 }
//     //             }
//     //         }
//     //     }
//     // },
//     // {
//     //     url: "/search",
//     //     get: {
//     //         summary: "get product by search",
//     //         description: "product  by search",
//     //         parameters: [

//     //             {
//     //                 in: "query",
//     //                 type: "string",
//     //                 name: "name",
//     //                 description: "product name",
//     //                 required: true
//     //             },
//     //             {
//     //                 in: "query",
//     //                 type: "string",
//     //                 name: "categories",
//     //                 description: "need a array of categoiers like paint,nails",
//     //                 required: true
//     //             },
//     //         ],
//     //         responses: {
//     //             default: {
//     //                 description: "Unexpected error",
//     //                 schema: {
//     //                     $ref: "#/definitions/Error"
//     //                 }
//     //             }
//     //         }
//     //     }
//     // },
//     // {
//     //     url: "/update",
//     //     put: {
//     //         summary: "Update",
//     //         description: "update user details",
//     //         parameters: [
//     //             // {
//     //             //   in: "path",
//     //             //   name: "id",
//     //             //   description: "user id",
//     //             //   required: true,
//     //             //   type: "string"
//     //             // },
//     //             {
//     //                 in: "body",
//     //                 name: "body",
//     //                 description: "Model of user update",
//     //                 required: true,
//     //                 schema: {
//     //                     $ref: "#/definitions/userUpdate"
//     //                 }
//     //             },
//     //             {
//     //                 in: "header",
//     //                 name: "x-access-token",
//     //                 description: "token to access api",
//     //                 required: true,
//     //                 type: "string"
//     //             }
//     //         ],
//     //         responses: {
//     //             default: {
//     //                 description: "Unexpected error",
//     //                 schema: {
//     //                     $ref: "#/definitions/Error"
//     //                 }
//     //             }
//     //         }
//     //     }
//     // },
//     // {
//     //     url: "/getById/{id}",
//     //     get: {
//     //         summary: "get user",
//     //         description: "get user detail by Id",
//     //         parameters: [
//     //             {
//     //                 in: "path",
//     //                 name: "id",
//     //                 description: "userId",
//     //                 required: true,
//     //                 type: "string"
//     //             },
//     //             {
//     //                 in: "header",
//     //                 name: "x-access-token",
//     //                 description: "token to access api",
//     //                 required: true,
//     //                 type: "string"
//     //             }
//     //         ],
//     //         responses: {
//     //             default: {
//     //                 description: "Unexpected error",
//     //                 schema: {
//     //                     $ref: "#/definitions/Error"
//     //                 }
//     //             }
//     //         }
//     //     }
//     // },
//     // {
//     //     url: "/login",
//     //     post: {
//     //         summary: "Login user",
//     //         description: "user login into system and get its token to access apis",
//     //         parameters: [
//     //             {
//     //                 in: "body",
//     //                 name: "body",
//     //                 description: "Model of login user",
//     //                 required: true,
//     //                 schema: {
//     //                     $ref: "#/definitions/Login"
//     //                 }
//     //             }
//     //         ],
//     //         responses: {
//     //             default: {
//     //                 description: "Unexpected error",
//     //                 schema: {
//     //                     $ref: "#/definitions/Error"
//     //                 }
//     //             }
//     //         }
//     //     }
//     // },
//     // {
//     //     url: "/resetPassword",
//     //     post: {
//     //         summary: "Reset Password",
//     //         description: "reset Password",
//     //         parameters: [
//     //             {
//     //                 in: "header",
//     //                 name: "x-access-token",
//     //                 description: "token to access api",
//     //                 required: true,
//     //                 type: "string"
//     //             },
//     //             {
//     //                 in: "body",
//     //                 name: "body",
//     //                 description: "Model of resetPassword user",
//     //                 required: true,
//     //                 schema: {
//     //                     $ref: "#/definitions/resetPassword"
//     //                 }
//     //             }
//     //         ],
//     //         responses: {
//     //             default: {
//     //                 description: "Unexpected error",
//     //                 schema: {
//     //                     $ref: "#/definitions/Error"
//     //                 }
//     //             }
//     //         }
//     //     }
//     // },
//     {
//         url: "/placeOrder",
//         post: {
//             summary: "place Order",
//             description: "place Order",
//             parameters: [
//                 {
//                     in: "body",
//                     name: "body",
//                     description: "Model of place Order creation",
//                     required: true,
//                     schema: {
//                         $ref: "#/definitions/orderCreate"
//                     }
//                 }
//             ],
//             responses: {
//                 default: {
//                     description: "Unexpected error",
//                     schema: {
//                         $ref: "#/definitions/Error"
//                     }
//                 }
//             }
//         }
//     },

//     {
//         url: "/list",
//         get: {
//             summary: "get order List",
//             description: "get all order",
//             parameters: [
//                 {
//                     in: "query",
//                     type: "integer",
//                     name: "pageNo",
//                     description: "pageNo",
//                     required: true
//                 },
//                 {
//                     in: "query",
//                     type: "integer",
//                     name: "pageSize",
//                     description: "pageSize",
//                     required: true
//                 },
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "userId",
//                     description: "userId",
//                     required: true
//                 },
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "sortByName",
//                     default: 'desc',
//                     description: "sortByName",
//                     required: false
//                 },
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "sortByDate",
//                     default: 'desc',
//                     description: "sortByName",
//                     required: false
//                 },
//             ],
//             responses: {
//                 default: {
//                     description: "Unexpected error",
//                     schema: {
//                         $ref: "#/definitions/Error"
//                     }
//                 }
//             }
//         }
//     },
//     {
//         url: "/byOrderNo/{orderNo}",
//         get: {
//             summary: "get order detail by No",
//             description: "get order detail by No",

//             responses: {
//                 default: {
//                     description: "Unexpected error",
//                     schema: {
//                         $ref: "#/definitions/Error"
//                     }
//                 }
//             }
//         }
//     },

// ];
