module.exports = [
    {
        name: "forgotPassword",
        properties: {
            oldToken: {
                type: "string"
            },
            email: {
                type: "string"
            },
            newPassword: {
                type: "string"
            }
        }
    }
];
