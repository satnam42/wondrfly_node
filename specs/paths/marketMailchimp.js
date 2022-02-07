module.exports = [
  {
    url: '/addSubscriber',
    post: {
      summary: 'add',
      description: 'add parent',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Model of add subscribers creation',
          required: true,
          schema: {
            $ref: '#/definitions/addSubscriber',
          },
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
];
