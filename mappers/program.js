'use strict'
const baseUrl = require('config').get('image').baseUrl
exports.toModel = (entity) => {
  let modifiedBy = {}
  let createdBy = {}
  let model = {
    _id: entity._id || '',
    ageGroup: entity.ageGroup || '',
    date: entity.date || '',
    time: entity.time || '',
    bookingCancelledIn: entity.bookingCancelledIn || '',
    capacity: entity.capacity || '',
    name: entity.name,
    alias: entity.alias || '',
    description: entity.description || '',

    providerName: entity.providerName || '',
    indoorOroutdoor: entity.indoorOroutdoor || '',
    source: entity.source || '',
    sourceUrl: entity.sourceUrl || '',
    city: entity.city || '',
    cycle: entity.cycle || '',
    activeStatus: entity.activeStatus || '',
    type: entity.type || '',
    price: entity.price || '',
    pricePeriod: entity.pricePeriod || '',
    code: entity.code || '',
    location: entity.location || '',
    joiningLink: entity.joiningLink || '',
    presenter: entity.presenter || '',
    programCoverPic: entity.programCoverPic || '',
    status: entity.status || '',
    timelinePics: entity.timelinePics || '',
    lat: entity.lat || '',
    lng: entity.lng || '',
    duration: entity.duration || '',
    isPublished: entity.isPublished || '',
    isFree: entity.isFree || '',
    isFav: entity.isFav,
    pricePerParticipant: entity.pricePerParticipant || '',
    priceForSiblings: entity.priceForSiblings || '',
    specialInstructions: entity.specialInstructions || '',
    adultAssistanceIsRequried: entity.adultAssistanceIsRequried || '',
    emails: entity.emails || '',
    addresses: entity.addresses || '',
    isDateNotMention: entity.isDateNotMention,
    isTimeNotMention: entity.isTimeNotMention,
    tags: entity.tags || '',
    days: entity.days || '',
    category: entity.categoryId || [],
    subCategoryIds: entity.subCategoryIds || [],
    batches: entity.batches || '',
    sessions: entity.sessions || '',
    programImage: entity.programImage ? baseUrl + entity.programImage : '',
  }

  if (entity.user) {
    ; (model.user = entity.user._id || ''),
      (model.programOwner = entity.user.firstName || ''),
      (model.averageFinalRating = entity.user.averageFinalRating || ''),
      (model.totalReviews = entity.user.totalReviews || '')

  }
  if (entity.provider) {
    ; (model.programOwner = entity.provider[0].firstName || ''),
      (model.userId = entity.provider[0]._id || ''),
      (model.averageFinalRating = entity.provider[0].averageFinalRating || ''),
      (model.totalReviews = entity.user.totalReviews || '')

  }

  if (
    entity.category != undefined &&
    entity.category[0] != '' &&
    entity.category[0] != undefined
  ) {
    model.categoryName = entity.category[0].name ? entity.category[0].name : ''
    model.categoryImage = entity.category[0].imageUrl
      ? baseUrl + entity.category[0].imageUrl
      : ''
  }
  if (entity.lastModifiedBy) {
    modifiedBy.firstName = entity.lastModifiedBy.firstName
    modifiedBy.email = entity.lastModifiedBy.email
    modifiedBy.role = entity.lastModifiedBy.role
    modifiedBy.updatedOn = entity.updatedOn
    model.lastModifiedBy = modifiedBy
  }
  if (entity.user) {
    createdBy.firstName = entity.user.firstName
    createdBy.email = entity.user.email
    createdBy.role = entity.user.role
    createdBy.createdOn = entity.createdOn
    model.addedBy = createdBy
  }
  if (entity.provider) {
    createdBy.firstName = entity.provider[0].firstName
    createdBy.createdOn = entity.createdOn
    model.addedBy = createdBy
  }

  if (entity.provider && entity.provider != undefined) {
    ; (model.about = entity.provider[0].about),
      // model.description = entity.provider[0].description,
      (model.facebook = entity.provider[0].facebook),
      (model.fullAddress = entity.provider[0].fullAddress),
      (model.categories = entity.provider[0].categories),
      (model.hours = entity.provider[0].hours),
      (model.imageURL = entity.provider[0].imageURL),
      (model.linkedin = entity.provider[0].linkedin),
      (model.listingURL = entity.provider[0].listingURL),
      (model.banners = entity.provider[0].banners),
      (model.rating = entity.provider[0].rating),
      (model.reviews = entity.provider[0].reviews),
      (model.twitter = entity.provider[0].twitter),
      (model.website = entity.provider[0].website),
      (model.youtube = entity.provider[0].youtube),
      (model.instagram = entity.provider[0].instagram),
      (model.awards = entity.provider[0].awards),
      (model.taxNumber = entity.provider[0].taxNumber),
      (model.merchantVerified = entity.provider[0].merchantVerified),
      (model.isAssociate = entity.provider[0].isAssociate),
      (model.createdBy = entity.provider[0].createdBy),
      (model.adminNotes = entity.provider[0].adminNotes),
      (model.logo = entity.provider[0].logo
        ? baseUrl + entity.provider[0].logo
        : ''),
      (model.user = entity.provider[0].user),
      (model.govtIdNote = entity.provider[0].govtIdNote),
      (model.govtIdUrl = entity.provider[0].govtIdUrl)
  }
  return model
}
exports.toSearchModel = (entities) => {
  return entities.map((entity) => {
    return exports.toModel(entity)
  })
}
