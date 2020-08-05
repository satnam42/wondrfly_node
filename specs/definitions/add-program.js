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
                    to: { type: "string" },
                    from: { type: "string" }
                }
            },
            date: {
                properties: {
                    to: { type: "string" },
                    from: { type: "string" }
                }
            },
            ageGroup: {
                properties: {
                    to: { type: "string" },
                    from: { type: "string" }
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
                    days: { type: "string" },
                    hours: { type: "string" }
                }
            },
            capacity: {
                properties: {
                    min: { type: "string" },
                    mix: { type: "string" }
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
                        startDate: { type: 'string', },
                        endDate: { type: 'string', },
                        startTime: { type: 'string', },
                        endTime: { type: 'string', },
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
