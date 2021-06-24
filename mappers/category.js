"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = entity => {
    let model = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        imageUrl: entity.imageUrl ? baseUrl + entity.imageUrl : '',
        iconUrl: entity.iconUrl ? baseUrl + entity.iconUrl : '',
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