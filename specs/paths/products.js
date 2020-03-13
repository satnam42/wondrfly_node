// module.exports = [

<<<<<<< HEAD
//     {
//         url: "/list",
//         get: {
//             summary: "get product List",
//             description: "get all product",
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
//         url: "/listByVendor",
//         get: {
//             summary: "get product list  accroding to vendor",
//             description: "get all product by vendor id",
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
//                     name: "vendorId",
//                     description: "vendorId",
//                     required: true
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
//         url: "/byCategories",
//         get: {
//             summary: "get product by categories",
//             description: "product  by categories",
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
//                     name: "vendorId",
//                     description: "vendorId",
//                     required: true
//                 },
//                 {
//                     in: "query",
//                     type: "array",
//                     name: "categories",
//                     description: "need a array of categoiers like paint,nails",
//                     required: true
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
//         url: "/search",
//         get: {
//             summary: "get product by search",
//             description: "product  by search",
//             parameters: [
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "vendorId",
//                     description: "product name",
//                     required: true
//                 },
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "name",
//                     description: "product name",
//                     required: true
//                 },
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "categories",
//                     description: "need a array of categoiers like paint,nails",
//                     required: true
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
//         url: "/asignVendor/{id}",
//         put: {
//             summary: "asign vendor to product",
//             description: "asign vendor to product",
//             parameters: [
//                 {
//                     in: "path",
//                     name: "id",
//                     description: "product id",
//                     required: true,
//                     type: "string"
//                 },
//                 {
//                     in: "body",
//                     name: "body",
//                     description: "Model of asignVendor",
//                     required: true,
//                     schema: {
//                         $ref: "#/definitions/asignVendor"
//                     }
//                 },
=======
    {
        url: "/list",
        get: {
            summary: "get product List",
            description: "get all product",
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
                    name: "customerGroup",
                    description: "customerGroup",
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
        url: "/listByVendor",
        get: {
            summary: "get product list  accroding to vendor",
            description: "get all product by vendor id",
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
                    name: "vendorId",
                    description: "vendorId",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "customerGroup",
                    description: "customerGroup",
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
        url: "/byCategories",
        get: {
            summary: "get product by categories",
            description: "product  by categories",
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
                    name: "vendorId",
                    description: "vendorId",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "customerGroup",
                    description: "customerGroup",
                    required: true
                },
                {
                    in: "query",
                    type: "array",
                    name: "categories",
                    description: "need a array of categoiers like paint,nails",
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
        url: "/search",
        get: {
            summary: "get product by search",
            description: "product  by search",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "vendorId",
                    description: "product name",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "name",
                    description: "product name",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "categories",
                    description: "need a array of categoiers like paint,nails",
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
        url: "/asignVendor/{id}",
        put: {
            summary: "asign vendor to product",
            description: "asign vendor to product",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "product id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of asignVendor",
                    required: true,
                    schema: {
                        $ref: "#/definitions/asignVendor"
                    }
                },
>>>>>>> 5946a1286946c55388262af0385d54fabbc5928a

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
//         url: "/addProduct",
//         post: {
//             summary: "create",
//             description: "create",
//             parameters: [
//                 {
//                     in: "body",
//                     name: "body",
//                     description: "Model of product creation",
//                     required: true,
//                     schema: {
//                         $ref: "#/definitions/productCreate"
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
//         url: "/categories",
//         get: {
//             summary: "get product categories List",
//             description: "get all categories of product",
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
