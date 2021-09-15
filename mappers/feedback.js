"use strict";

exports.toModel = entity => {
    let model = {
        id: entity.id,
        firstName: entity.user.firstName,
        email: entity.user.email,
        feedback: entity.name,
        description: entity.description,
        startDate: entity.startDate,
        endDate: entity.endDate,
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