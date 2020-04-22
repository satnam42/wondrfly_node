module.exports = [
    {
        name: "permissionCreate",
        properties: {
            userId: {
                type: "string"
            },
            // entityId: {
            //     type: "string"
            // },
            permissionTypeId: {
                type: "string"
            },
            isDeleted: {
                type: "Boolean",
            },
        }
    }
];
