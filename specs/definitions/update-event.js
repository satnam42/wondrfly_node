module.exports = [
    {
        name: "update-event",
        properties: {

            title: {
                type: "string",
                default: "",
            },
            description: {
                type: "string",
                default: "",
            },
            date: {
                properties: {
                    to: { type: "date" },
                    from: { type: "date" }
                }
            },
        }
    }
];