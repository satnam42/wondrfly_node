"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = entity => {
    let model = {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        sex: entity.sex,
        email: entity.email,
        type: entity.type,
        phoneNumber: entity.phoneNumber,
        avatarImages: entity.avatarImages ? baseUrl + entity.avatarImages : '',
        addressLine1: entity.addressLine1,
        addressLine2: entity.addressLine2,
        street: entity.street,
        state: entity.state,
        city: entity.city,
        country: entity.country,
        source: entity.source,
        isClaimed: entity.isClaimed,
        zipCode: entity.zipCode,
        lat: entity.lat,
        lng: entity.lng,
        stripeToken: entity.stripeToken,
        stripeKey: entity.stripeKey,
        lastLoggedIn: entity.lastLoggedIn,
        personalNote: entity.personalNote,
        loginLimit: entity.loginLimit,
        securityQuestion: entity.securityQuestion,
        answer: entity.answer,
        inviteBy: entity.inviteBy,
        ssn: entity.ssn,
        isActivated: entity.isActivated,
        isDeleted: entity.isDeleted,
        lastModifiedBy: entity.lastModifiedBy,
        deletedBy: entity.deletedBy,
        token: entity.token,
        createdBy: entity.createdBy,
        note: entity.note,
        profileCompleteEmail: entity.profileCompleteEmail,
        isAmbassador: entity.isAmbassador,
        role: entity.role,
        totalPoints: entity.totalPoints,
        rewardpointIds: entity.rewardpointIds,
        deviceToken: entity.deviceToken,
        isAmbassadorOn: entity.isAmbassadorOn,

        permissions: entity.permissions || [],
        updatedOn: entity.updatedOn,
        createdOn: entity.createdOn,
    }
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};





