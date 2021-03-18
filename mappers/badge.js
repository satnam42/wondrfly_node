"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = entity => {
    let model = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        icon: entity.icon ? baseUrl + entity.icon : '',
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