'use strict'
const baseUrl = require('config').get('image').baseUrl

exports.toModel = (entity) => {
  let user
  if (entity.user) {
    user = entity.user
  } else {
    user = entity
  }
  console.log("user entity",entity)
  let model = {
    id: user.id || user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
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
    isFreeTrial: user.isFreeTrial,
    expiredPrograms: user.expired,
    activePrograms: user.active,
    allPrograms:user.allPrograms,
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
      (model.provider_logo = entity.provider_logo || ''),
      (model.source = entity.provider.source || ''),
      (model.sourceUrl = entity.provider.sourceUrl || ''),
      (model.categories = entity.provider.categories || ''),
      (model.subCategoryIds = entity.provider.subCategoryIds || ''),
      (model.cancellation_and_refund = entity.provider.cancellation_and_refund || ''),
      (model.cycle_time = entity.provider.cycle_time || 0),
      (model.proof_reader_notes = entity.provider.proof_reader_notes || ''),
      (model.activeStatus = entity.provider.activeStatus || ''),
      (model.addedBy = entity.provider.addedBy || "")


  }

  return model
}

exports.toSearchModel = (entities) => {
  return entities.map((entity) => {
    return exports.toModel(entity)
  })
}
