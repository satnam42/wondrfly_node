module.exports = [
    {
        url: "/sendOtpSMS",
        post: {
            summary: "add phone number",
            description: "add phone number",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of send sms otp",
                    required: true,
                    schema: {
                        $ref: "#/definitions/sms-otp"
                    }
                },
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                }
            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    }

]