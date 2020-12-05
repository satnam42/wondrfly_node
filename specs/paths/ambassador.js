module.exports = [
    {
        url: "/addOrRemove",
        post: {
            summary: "add or remove ambasssdor",
            description: "add or remove ambasssdor",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of Add or remove ambassdor",
                    required: true,
                    schema: {
                        $ref: "#/definitions/addRemove-ambassador"
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
        url: "/getAmbassadors",
        get: {
            summary: "get ambassadors list",
            description: "get ambassadors list",
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

    // {
    //     url: "/addActivities",
    //     post: {
    //         summary: "add",
    //         description: "add activity",
    //         parameters: [
    //             {
    //                 in: "body",
    //                 name: "body",
    //                 description: "Model of activity creation",
    //                 required: true,
    //                 schema: {
    //                     $ref: "#/definitions/activitiesAdd"
    //                 }
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
    //     url: "/getActivities",
    //     get: {
    //         summary: "get activities list",
    //         description: "get activities list",
    //         parameters: [
    //             {
    //                 in: "header",
    //                 name: "x-access-token",
    //                 description: "token to access api",
    //                 required: true,
    //                 type: "string"
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

    {
        url: "/addActivityPoint",
        post: {
            summary: "add",
            description: "add activity point",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of activity point adding",
                    required: true,
                    schema: {
                        $ref: "#/definitions/AddActivityPoint"
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
    //     url: "/deleteActivity/{id}",
    //     delete: {
    //         summary: "Delete",
    //         description: "Delete activity",
    //         parameters: [
    //             {
    //                 in: "path",
    //                 name: "id",
    //                 description: "activity id",
    //                 required: true,
    //                 type: "string"
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
    //     url: "/updateActivity/{id}",
    //     put: {
    //         summary: "activity",
    //         description: "update activity by id",
    //         parameters: [
    //             {
    //                 in: "path",
    //                 name: "id",
    //                 description: "activity id",
    //                 required: true,
    //                 type: "string"
    //             },
    //             {
    //                 in: "body",
    //                 name: "body",
    //                 description: "Model of asignVendor",
    //                 required: true,
    //                 schema: {
    //                     $ref: "#/definitions/activitiesAdd"
    //                 }
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
    // }
]