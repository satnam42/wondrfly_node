"use strict";

exports.toModel = (entity) => {
    let model = {}

    if (entity.invitedTo && entity.invitedTo != undefined) {
        model.id = entity.invitedTo.id,
            model.firstName = entity.invitedTo.firstName,
            model.lastName = entity.invitedTo.lastName,
            model.phoneNumber = entity.invitedTo.phoneNumber,
            model.avatarImages = entity.invitedTo.avatarImages,
            model.relationToChild = entity.relationToChild
        model.email = entity.invitedTo.email,
            model.age = entity.invitedTo.age,
            model.personalNote = entity.invitedTo.personalNote,
            model.isOnBoardingDone = entity.invitedTo.isOnBoardingDone,
            model.sex = entity.invitedTo.sex,
            model.addressLine1 = entity.invitedTo.addressLine1,
            model.addressLine2 = entity.invitedTo.addressLine2,
            model.city = entity.invitedTo.city,
            model.country = entity.invitedTo.country,
            model.zipCode = entity.invitedTo.zipCode,
            model.lat = entity.invitedTo.lat,
            model.long = entity.invitedTo.long,
            model.stripeToken = entity.invitedTo.stripeToken,
            model.stripeKey = entity.invitedTo.stripeKey,
            model.ssn = entity.invitedTo.ssn,
            model.isActivated = entity.invitedTo.isActivated,
            model.lastModifiedBy = entity.invitedTo.lastModifiedBy,
            model.createdBy = entity.invitedTo.createdBy,
            model.deviceToken = entity.invitedTo.deviceToken,
            model.role = entity.invitedTo.role,
            model.token = entity.invitedTo.token

    }
    return model;

}

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};
