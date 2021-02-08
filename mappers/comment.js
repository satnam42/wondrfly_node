"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = entity => {
    let model = {
        userRole: entity.userRole,
        userImage: entity.userImage ? baseUrl + entity.userImage : '',
        _id: entity._id,
        creator: entity.creator,
        creatorName: entity.creatorName,
        userCreatedOn: entity.userCreatedOn,
        postId: entity.postId,
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