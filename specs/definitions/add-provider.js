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
            addressLine1: {
                type: "string"
            },
            addressLine2: {
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
            website: {
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
            healthAndSafety: {
                type: 'array',
                items: {
                    properties: {
                        disposableMasksProvided: { type: 'boolean' },
                        qrCodeRegistration: { type: 'boolean' },
                        staffHealthAndHygieneProtocols: { type: 'boolean' },
                        dailyEquipment: { type: 'boolean' },
                        sanitizerStations: { type: 'boolean' },
                        limitedClassSizes: { type: 'boolean' },
                        limitedClassSizes: { type: 'boolean' },
                        parentObservation: { type: 'boolean' }
                    }
                }
            },

        }
    }
];
