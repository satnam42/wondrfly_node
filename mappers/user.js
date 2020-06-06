"use strict";

exports.toModel = entity => {
  const model = {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    phoneNumber: entity.phoneNumber,
    email: entity.email,
    sex: entity.sex,
    addressLine1: entity.addressLine1,
    addressLine2: entity.addressLine2,
    city: entity.city,
    country: entity.country,
    zipCode: entity.zipCode,
    lat: entity.lat,
    long: entity.long,
    stripeToken: entity.stripeToken,
    stripeKey: entity.stripeKey,
    ssn: entity.ssn,
    isActivated: entity.isActivated,
    lastModifiedBy: entity.lastModifiedBy,
    createdBy: entity.createdBy,
    deviceToken: entity.deviceToken,
    role: entity.role,
    token: entity.token,
    permissions: entity.permissions || [],
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
