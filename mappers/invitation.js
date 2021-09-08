"use strict";

exports.toModel = entity => {
    let model = {
        invitation: entity.id,
        user: entity.user.id,
        name: entity.user.firstName,
        email: entity.user.email,
        acceptance: entity.acceptance,
        date: entity.createdOn
    }
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};