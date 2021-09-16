"use strict";

exports.toModel = entity => {
    let model = {
        invitation: entity.id,
        email: entity.invitedToEmail ? entity.invitedToEmail : entity.user.email,
        name: entity.invitedToName ? entity.invitedToName : entity.user.firstName,
        isInvited: entity.isInvited,
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