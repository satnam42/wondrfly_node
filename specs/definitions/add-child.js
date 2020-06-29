module.exports = [
    {
        name: "childAdd",
        properties: {
            name: {
                type: "string"
            },
            dob: {
                type: "string"
            },
            interestInfo: {
                type: 'array',
                items: {
                    // type: 'array',
                    type: "string", default: ""
                    // properties:
                    //     { type: "string", default: "" },

                }
            },
            relationToChild: {
                type: "string"
            },
            sex: {
                type: "string"
            },
            avtar: {
                type: "string"
            },
            contactOtherInfo: {
                type: "string"
            },
            schoolInfo: {
                type: "string"
            },
            dislikes: {
                type: "string"
            },
            alergies: {
                type: "string"
            },
            parentNotes: {
                type: "string"
            },
            parentId: {
                type: "string"
            }
        },
    },
]
