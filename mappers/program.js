"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = (entity) => {
    let model = {
        _id: entity._id || '',
        ageGroup: entity.ageGroup || '',
        date: entity.date || '',
        time: entity.time || '',
        bookingCancelledIn: entity.bookingCancelledIn || '',
        capacity: entity.capacity || '',
        name: entity.name,
        description: entity.description || '',
        type: entity.type || '',
        price: entity.price || '',
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
        isFav: entity.isFav || '',
        pricePerParticipant: entity.pricePerParticipant || '',
        priceForSiblings: entity.priceForSiblings || '',
        specialInstructions: entity.specialInstructions || '',
        adultAssistanceIsRequried: entity.adultAssistanceIsRequried || '',
        emails: entity.emails || '',
        addresses: entity.addresses || '',
        tags: entity.tags || '',
        batches: entity.batches || '',
        user: entity.user || '',
        categoryId: entity.categoryId || ''
    }

    if (entity.provider && entity.provider != undefined) {
        model._id = entity.provider[0]._id,
            model.about = entity.provider[0].about,
            model.description = entity.provider[0].description,
            model.facebook = entity.provider[0].facebook,
            model.fullAddress = entity.provider[0].fullAddress,
            model.categories = entity.provider[0].categories,
            model.hours = entity.provider[0].hours,
            model.imageURL = entity.provider[0].imageURL,
            model.linkedin = entity.provider[0].linkedin,
            model.listingURL = entity.provider[0].listingURL,
            model.banners = entity.provider[0].banners,
            model.rating = entity.provider[0].rating,
            model.reviews = entity.provider[0].reviews,
            model.twitter = entity.provider[0].twitter,
            model.website = entity.provider[0].website,
            model.youtube = entity.provider[0].youtube,
            model.instagram = entity.provider[0].instagram,
            model.awards = entity.provider[0].awards,
            model.taxNumber = entity.provider[0].taxNumber,
            model.merchantVerified = entity.provider[0].merchantVerified,
            model.isAssociate = entity.provider[0].isAssociate,
            model.createdBy = entity.provider[0].createdBy,
            model.adminNotes = entity.provider[0].adminNotes,
            model.logo = (entity.provider[0].logo) ? baseUrl + (entity.provider[0].logo) : '',
            model.user = entity.provider[0].user,
            model.govtIdNote = entity.provider[0].govtIdNote,
            model.govtIdUrl = entity.provider[0].govtIdUrl

    }
    return model;

}
exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};