module.exports = [
  {
    name: 'addSubscriber',
    properties: {
      email: {
        type: 'string',
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      // type: {
      //     type: "string"
      // },
    },
  },
];
