module.exports = [
    {
        name: "verifyTwilioOtp",
        properties: {
            userId: {
                type: "string"
            },
            phoneNumber: {
                type: "string"
            },
            otp: {
                type: "string"
            },
            otpToken: {
                type: "string"
            }
        }
    }
];
