module.exports = [
    {
        name: "addAddress",
        properties: {
            name: { type: "string", default: "" },
            address: { type: "string", default: "" },
            city: { type: "string", default: "" },
            state: { type: "string", default: "" },
            zipCode: { type: "string", default: "" },
            specialInstruction: { type: "string", default: "" },
            contactName: { type: "string", default: "" },
            contactNumber: { type: "string", default: "" },
            status: {
                type: "string", default: "active",
                enum: ["active", "dective"]
            },
            userId: {
                type: "string",
            },
        }
    }

];
