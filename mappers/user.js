"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = entity => {
  let user
  if (entity.user) {
    user = entity.user
  }
  else {
    user = entity
  }
  let model = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    isPhoneVerified: user.isPhoneVerified,
    avatarImages: user.avatarImages ? baseUrl + user.avatarImages : '',
    email: user.email,
    isOnBoardingDone: user.isOnBoardingDone,
    sex: user.sex,
    addressLine1: user.addressLine1,
    addressLine2: user.addressLine2,
    city: user.city,
    country: user.country,
    zipCode: user.zipCode,
    lat: user.lat,
    long: user.long,
    stripeToken: user.stripeToken,
    stripeKey: user.stripeKey,
    ssn: user.ssn,
    isActivated: user.isActivated,
    lastModifiedBy: user.lastModifiedBy,
    source: user.source,
    state: user.state,
    createdBy: user.createdBy,
    deviceToken: user.deviceToken,
    note: user.note,
    role: user.role,
    alert: user.alert,
    alertType: user.alertType,
    disableAlert: user.disableAlert,
    totalPoints: user.totalPoints,
    progress: user.progress,
    isAmbassador: user.isAmbassador,
    isAmbassadorOn: user.isAmbassadorOn,
    token: user.token,
    securityQuestion: user.securityQuestion,
    permissions: user.permissions || [],
    updatedOn: user.updatedOn,
    createdOn: user.createdOn,
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
      model.provider_logo = entity.provider_logo || ''
  }

  return model;
};

exports.toSearchModel = entities => {
  return entities.map(entity => {
    return exports.toModel(entity);
  });
};
