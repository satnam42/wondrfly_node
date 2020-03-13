"use strict";

exports.toModel = entity => {
  const model = {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    phoneNumber: entity.phoneNumber,
    email: entity.email,
    role: entity.role,
<<<<<<< HEAD
=======
    status: entity.status,
    country: entity.country,
    customerGroup: entity.customerGroup,
>>>>>>> 5946a1286946c55388262af0385d54fabbc5928a
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
