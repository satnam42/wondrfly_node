module.exports = [
    {
        name: "update-alert",
        properties: {
            alertId: {
                type: "string",
                default: "",
            },
            email: {
                type: "string",
                default: "",
            },
            fromDate: {
                type: "string",
                default: "",
            },
            toDate: {
                type: "string",
                default: "",
            },
            msg: {
                type: "string",
                default: "",
            },
            msgType: {
                type: "string",
                default: "",
            },
            alertFor: {
                type: "string",
                default: "",
            },
        }
    }
];