"use strict";

exports.toModel = entity => {
  const model = {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    phoneNumber: entity.phoneNumber,
    email: entity.email,
    role: entity.role,
    token: entity.token,
    deviceToken: entity.deviceToken,
    updatedOn: entity.updatedOn,
    createdOn: entity.createdOn,
  };
  return model;
};

exports.toSearchModel = entities => {
  return entities.map(entity => {
    return exports.toModel(entity);
  });
};
