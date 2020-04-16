"use strict";

exports.toModel = entity => {

    const model = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        quantity: entity.quantity,
        overAllPrice: entity.overAllPrice,
        status: entity.status,
        image: entity.image,
        note: entity.note,
        height: entity.height,
        width: entity.width,
        length: entity.length,
        manufacturer: entity.manufacturer,
        sku: entity.sku,
        manufacturer: entity.manufacturer,
        costPerEach: entity.costPerEach,
        category: entity.category,
        subCategory: entity.subCategory,
        vendor: entity.vendorId,
        variation: entity.variation,
        updatedOn: entity.updatedOn,
        createdOn: entity.createdOn,
    };
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};
