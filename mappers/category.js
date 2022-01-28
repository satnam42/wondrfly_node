"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = entity => {
    let model = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        alternativeText: entity.alternativeText,
        imageUrl: entity.imageUrl,
        iconUrl: entity.iconUrl,
        logoUrl: entity.logoUrl,
        pattern: entity.pattern,
        isActivated: entity.isActivated,
        totalPrograms: entity.totalPrograms,
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