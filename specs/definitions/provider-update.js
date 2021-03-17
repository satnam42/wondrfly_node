module.exports = [
    {
        name: "providerUpdate",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            phoneNumber: {
                type: 'string'
            },
            category: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            facebook: {
                type: 'string'
            },
            website: {
                type: 'string'
            },
            youtube: {
                type: 'string'
            },
            lat: {
                type: 'string'
            },
            lng: {
                type: 'string'
            },
            instagram: {
                type: 'string'
            },
            addressLine1: {
                type: 'string'
            },
            addressLine2: {
                type: 'string'
            },
            about: {
                type: 'string'
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
            isAmbassador: {
                type: "boolean"
            },
            interests: {
                type: 'array',
                items: {
                    type: "string", default: ""
                }
            },
            city: { type: 'string', },
            country: { type: 'string', },
            state: { type: 'string', },
            street: { type: 'string', },
            source: { type: 'string', },
            note: { type: 'string', },
            securityQuestion: { type: 'string', },
            answer: { type: 'string', },
            zipCode: { type: 'string', },
            logo: { type: 'string', },
        }
    }
];
