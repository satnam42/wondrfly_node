module.exports = [{
    url: '/getOldChat',
    get: {
        summary: 'get old chat',
        description: 'get old chat',
        parameters: [{
            in: 'query',
            type: "string",
            name: 'room_id',
            description: 'Room Id',
            required: true,
        }, {
            in: 'query',
            type: "integer",
            name: 'pageNo',
            description: 'pageNo',
            required: true,
        }, {
            in: 'query',
            type: "integer",
            name: 'pageSize',
            description: 'pageSize',
            required: true,
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
                description: 'Unexpected error',
                schema: {
                    $ref: '#/definitions/Error'
                }
            }
        }
    },
}

]
