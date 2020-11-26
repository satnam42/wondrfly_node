"use strict";

exports.toModel = entity => {
  let model = {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    phoneNumber: entity.phoneNumber,
    avatarImages: entity.avatarImages,
    email: entity.email,
    isOnBoardingDone: entity.isOnBoardingDone,
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
    source: entity.source,
    state: entity.state,
    createdBy: entity.createdBy,
    deviceToken: entity.deviceToken,
    note: entity.note,
    role: entity.role,
    isAmbassador: entity.isAmbassador,
    isAmbassadorOn: entity.isAmbassadorOn,
    token: entity.token,
    securityQuestion: entity.securityQuestion,
    permissions: entity.permissions || [],
    updatedOn: entity.updatedOn,
    createdOn: entity.createdOn,
  }

  if (entity.provider !== undefined && entity.provider !== null) {
    model.about = entity.provider.about || '',
      model.description = entity.provider.description || '',
      model.facebook = entity.provider.facebook || '',
      model.fullAddress = entity.provider.fullAddress || '',
      model.hours = entity.provider.hours || '',
      model.imageURL = entity.provider.imageURL || '',
      model.linkedin = entity.provider.linkedin,
      model.listingURL = entity.provider.listingURL || '',
      model.banners = entity.provider.banners || '',
      model.rating = entity.provider.rating || '',
      model.reviews = entity.provider.reviews || '',
      model.twitter = entity.provider.twitter || '',
      model.website = entity.provider.website || '',
      model.youtube = entity.provider.youtube || '',
      model.instagram = entity.provider.instagram || '',
      model.awards = entity.provider.awards || '',
      model.taxNumber = entity.provider.taxNumber || '',
      model.workingFrom = entity.provider.workingFrom || '',
      model.isAssociate = entity.provider.isAssociate || '',
      // model.tier= entity.provider.tier || '',
      model.notes = entity.provider.notes || '',
      model.adminNotes = entity.provider.adminNotes || '',
      model.proivide_logo = entity.proivide_logo || ''
  }

  return model;
};

exports.toSearchModel = entities => {
  return entities.map(entity => {
    return exports.toModel(entity);
  });
};
