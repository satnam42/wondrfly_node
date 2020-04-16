"use strict";

exports.toModel = entity => {
    const model = {
        id: entity.id,
        name: entity.name,
        address: entity.address,
        city: entity.city,
        state: entity.state,
        zipCode: entity.zipCode,
        specialInstruction: entity.specialInstruction,
        contactName: entity.contactName,
        contactNumber: entity.contactNumber,
        status: entity.status,
        user: entity.userId,
        createdOn: entity.createdOn,
        updatedOn: entity.updatedOn,
    };
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};
