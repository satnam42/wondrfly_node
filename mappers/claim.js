"use strict";

exports.toModel = entity => {
    let requested = {}
    if (entity.requestOn) {
        requested.requestOnId = entity.requestOn.id
        requested.firstName = entity.requestOn.firstName
        requested.email = entity.requestOn.email
    }
    let model = {
        id: entity.id,
        status: entity.status,
        requestOn: requested ? requested : '',
        requestBy: entity.requestBy,
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