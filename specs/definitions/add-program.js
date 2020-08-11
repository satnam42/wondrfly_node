module.exports = [
    {
        name: "programAdd",
        properties: {
            name: {
                type: "string"
            },
            description: {
                type: "string"
            },
            type: {
                type: "string"
            },
            price: {
                type: "string"
            },
            location: {
                type: "string"
            },
            code: {
                type: "string"
            },
            time: {
                properties: {
                    to: { type: "date" },
                    from: { type: "date" }
                }
            },
            date: {
                properties: {
                    to: { type: "date" },
                    from: { type: "date" }
                }
            },
            ageGroup: {
                properties: {
                    to: { type: "number" },
                    from: { type: "number" }
                }
            },
            bookingCancelledIn: {
                properties: {
                    day: { type: "string" },
                    hours: { type: "string" }
                }
            },
            duration: {
                type: "string"
            },
            isFree: {
                type: "boolean"
            },
            pricePerParticipant: {
                type: "string"
            },
            priceForSiblings: {
                type: "string"
            },
            specialInstructions: {
                type: "string"
            },
            adultAssistanceIsRequried: {
                type: "boolean"
            },
            capacity: {
                properties: {
                    min: { type: "number" },
                    mix: { type: "number" }
                }
            },
            emails: {
                type: 'array',
                items: {
                    type: "string"
                }
            },
            batches: {
                type: 'array',
                items: {
                    properties: {
                        name: { type: 'string', },
                        startDate: { type: 'date', },
                        endDate: { type: 'date', },
                        startTime: { type: 'date', },
                        endTime: { type: 'date', },
                        isPaid: { type: 'string', },
                        endTime: { type: 'string', },
                        pricePerParticipant: { type: 'string', },
                        priceForSiblings: { type: 'string', },
                        instructor: { type: 'string', },
                        numberOfSeats: { type: 'string', },
                        location: { type: 'string', },
                    }
                }
            },
            userId: {
                type: "string"
            },
            addresses: {
                type: 'array',
                items: {
                    type: "string"
                }
            },
            tags: {
                type: 'array',
                items: {
                    type: "string"
                }
            },
        }
    }
];
