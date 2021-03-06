'use strict'

exports.toModel = (entity) => {
  let createdBy = {}
  let model = {
    about: entity.about || '',
    alias: entity.alias || '',
    bio: entity.bio || '',
    description: entity.description || '',
    facebook: entity.facebook || '',
    fullAddress: entity.fullAddress || '',
    hours: entity.hours || '',
    imageURL: entity.imageURL || '',
    linkedin: entity.linkedin,
    listingURL: entity.listingURL || '',
    banners: entity.banners || '',
    rating: entity.rating || '',
    reviews: entity.reviews || '',
    twitter: entity.twitter || '',
    website: entity.website || '',
    youtube: entity.youtube || '',
    instagram: entity.instagram || '',
    awards: entity.awards || '',
    taxNumber: entity.taxNumber || '',
    workingFrom: entity.workingFrom || '',
    healthAndSafety: entity.healthAndSafety || '',
    isAssociate: entity.isAssociate || '',
    tier: entity.tier || '',
    notes: entity.notes || '',
    adminNotes: entity.adminNotes || '',
    cancellation_and_refund: entity.cancellation_and_refund,
    last_reviewed: entity.last_reviewed,
    cycle_time: entity.cycle_time,
    proof_reader_notes: entity.proof_reader_notes,
    logo: entity.logo || '',
    token: entity.token || '',
  }
  if (entity.addedBy) {
    createdBy.firstName = entity.addedBy.firstName
    createdBy.email = entity.addedBy.email
    createdBy.role = entity.addedBy.role

    model.addedBy = createdBy
  }

  if (entity.user && entity.user != undefined) {
    ; (model.id = entity.user.id),
      (model.firstName = entity.user.firstName),
      (model.lastName = entity.user.lastName),
      (model.userName = entity.user.userName),
      (model.phoneNumber = entity.user.phoneNumber),
      (model.secondaryPhonenumber = entity.user.secondaryPhonenumber),
      (model.avatarImages = entity.user.avatarImages),
      (model.email = entity.user.email),
      (model.isOnBoardingDone = entity.user.isOnBoardingDone),
      (model.sex = entity.user.sex),
      (model.addressLine1 = entity.user.addressLine1),
      (model.addressLine2 = entity.user.addressLine2),
      (model.city = entity.user.city),
      (model.country = entity.user.country),
      (model.zipCode = entity.user.zipCode),
      (model.lat = entity.user.lat),
      (model.long = entity.user.long),
      (model.stripeToken = entity.user.stripeToken),
      (model.stripeKey = entity.user.stripeKey),
      (model.ssn = entity.user.ssn),
      (model.isActivated = entity.user.isActivated),
      (model.lastModifiedBy = entity.user.lastModifiedBy),
      (model.createdBy = entity.user.createdBy),
      (model.deviceToken = entity.user.deviceToken),
      (model.role = entity.user.role),
      (model.token = entity.user.token)
  }
  return model
}

exports.toSearchModel = (entities) => {
  return entities.map((entity) => {
    return exports.toModel(entity)
  })
}
