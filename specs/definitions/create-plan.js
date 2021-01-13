module.exports = [
    {
        name: "createPlan",
        properties: {
            title: { type: "string", default: "" },
            description: { type: "string", default: "" },
            price: { type: "string", default: "" },
            features: {
                type: 'array',
                items: {
                    type: 'array',
                    properties: {
                        id: {
                            type: "string",
                            default: "",
                        },
                    }
                }
            },
        }
    }

];
