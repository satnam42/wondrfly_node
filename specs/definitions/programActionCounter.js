module.exports = [

    {
        name: "programActionCounterAdd",
        properties: {
            action: {
                type: "string",
                enum: ["view", "click", "favourite"]
            },
            programId: {
                type: "string"
            },
        }
    }
];


