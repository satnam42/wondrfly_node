'use strict'
const baseUrl = require('config').get('image').baseUrl

exports.toModel = (entity) => {
  let user
  if (entity.user) {
    user = entity.user
  } else {
    user = entity
  }
  let model = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    secondaryPhonenumber: user.secondaryPhonenumber,
    isPhoneVerified: user.isPhoneVerified,
    avatarImages: user.avatarImages ? baseUrl + user.avatarImages : '',
    email: user.email,
    age: user.age,
    personalNote: user.personalNote,
    isOnBoardingDone: user.isOnBoardingDone,
    sex: user.sex,
    addressLine1: user.addressLine1,
    addressLine2: user.addressLine2,
    city: user.city,
    country: user.country,
    zipCode: user.zipCode,
    lat: user.lat,
    lng: user.lng,
    location: user.location,
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
    isUserVerified: user.isUserVerified,
    isAmbassador: user.isAmbassador,
    isAmbassadorOn: user.isAmbassadorOn,
    token: user.token,
    interests: user.interests,
    notificationsOnOff: user.notificationsOnOff,
    securityQuestion: user.securityQuestion,
    permissions: user.permissions || [],
    notices: entity.notifications ? entity.notifications : [],
    updatedOn: user.updatedOn,
    createdOn: user.createdOn,
  }

  if (entity.provider !== undefined && entity.provider !== null) {
    ; (model.about = entity.provider.about || ''),
      (model.alias = entity.provider.alias || ''),
      (model.description = entity.provider.description || ''),
      (model.facebook = entity.provider.facebook || ''),
      (model.fullAddress = entity.provider.fullAddress || ''),
      (model.hours = entity.provider.hours || ''),
      (model.imageURL = entity.provider.imageURL || ''),
      (model.linkedin = entity.provider.linkedin),
      (model.listingURL = entity.provider.listingURL || ''),
      (model.banners = entity.provider.banners || ''),
      (model.rating = entity.provider.rating || ''),
      (model.reviews = entity.provider.reviews || ''),
      (model.twitter = entity.provider.twitter || ''),
      (model.website = entity.provider.website || ''),
      (model.youtube = entity.provider.youtube || ''),
      (model.instagram = entity.provider.instagram || ''),
      (model.awards = entity.provider.awards || ''),
      (model.taxNumber = entity.provider.taxNumber || ''),
      (model.workingFrom = entity.provider.workingFrom || ''),
      (model.isAssociate = entity.provider.isAssociate || ''),
      // model.tier= entity.provider.tier || '',
      (model.healthAndSafety = entity.provider.healthAndSafety || ''),
      (model.notes = entity.provider.notes || ''),
      (model.adminNotes = entity.provider.adminNotes || ''),
      (model.provider_logo = entity.provider_logo || '')
  }

  return model
}

exports.toSearchModel = (entities) => {
  return entities.map((entity) => {
    return exports.toModel(entity)
  })
}
