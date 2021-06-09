"use strict";

exports.toModel = entity => {
    let model = {
        id: entity.id,
        feedback: entity.feedback,
        firstName: entity.user.firstName,
        email: entity.user.email,
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