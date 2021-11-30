"use strict";
const baseUrl = require('config').get('image').baseUrl

exports.toModel = entity => {
    let model = {
        id: entity.id,
        name: entity.name,
        dob: entity.dob,
        sex: entity.sex,
        age: entity.age,
        isActivated: entity.isActivated,
        avtar: entity.avtar ? baseUrl + entity.avtar : '',
        relationToChild: entity.relationToChild,
        contactOtherInfo: entity.contactOtherInfo,
        schoolInfo: entity.schoolInfo,
        interestInfo: entity.tags,
        categories: entity.categories,
        gradeLevel: entity.gradeLevel,
        fromWhereYouHeard: entity.fromWhereYouHeard,
        dislikes: entity.dislikes,
        alergies: entity.alergies,
        parentNotes: entity.parentNotes,
        isDeleted: entity.isDeleted,
        createdBy: entity.createdBy,
        lastModifiedBy: entity.lastModifiedBy,
        deletedBy: entity.deletedBy,
        status: entity.status,
        parent: entity.parent,
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