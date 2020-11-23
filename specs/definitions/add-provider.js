module.exports = [

    {
        name: "providerCreate",
        properties: {
            firstName: {
                type: "string"
            },
            email: {
                type: "string"
            },
            type: {
                type: "string"
            },
            city: {
                type: "string"
            },
            country: {
                type: "string"
            },
            street: {
                type: "string"
            },
            state: {
                type: "string"
            },
            phoneNumber: {
                type: "string"
            },
            source: {
                type: "string"
            },
            note: {
                type: "string"
            },
            isAmbassador: {
                type: "boolean"
            },
            lat: {
                type: "string"
            },
            lng: {
                type: "string"
            },
            categoryIds: {
                type: 'array',
                items: {
                    // type: 'array',
                    type: "string", default: ""
                    // properties:
                    //     { type: "string", default: "" },

                }
            },
            tagsId: {
                type: 'array',
                items: {
                    // type: 'array',
                    type: "string", default: ""
                    // properties:
                    //     { type: "string", default: "" },

                }
            },

        }
    }
];
