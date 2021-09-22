"use strict";
var moment = require('moment') // require for date formating

exports.toModel = entity => {
    let inviter = {}
    if (entity.invitedBy) {
        inviter.name = entity.invitedBy.firstName
    }
    let model = {
        invitation: entity.id,
        email: entity.user.email,
        name: entity.user.firstName,
        isInvited: entity.isInvited,
        inviter: inviter.name ? inviter.name : '',
        status: entity.status,
        date: entity.createdOn
    }
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};