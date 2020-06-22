module.exports = [
    {
        name: "forgotPassword",
        properties: {
            otpToken: {
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
