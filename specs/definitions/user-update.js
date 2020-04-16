module.exports = [
  {
    name: "userUpdate",
    properties: {
      firstName: {
        type: "string"
      },
      lastName: {
        type: "string"
      },
      phoneNumber: {
        type: 'string'
      },
      role: {
        type: "string",
        default: "parent",
        enum: ["provider", "child", "admin"]
      },
    }
  }
];
