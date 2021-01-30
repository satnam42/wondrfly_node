"use strict";

const build = async (model, context) => {
    const { name, description, status } = model;
    const log = context.logger.start(`services:feature:build${model}`);
    const feature = await new db.feature({
        name,
        description,
        status,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return feature;
};


const set = (model, feature, context) => {
    const log = context.logger.start("services:feature:set");

    if (model.name !== "string" && model.name !== undefined && model.name !== '') {
        feature.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined && model.description !== '') {
        feature.description = model.description;
    }
    if (model.status !== "string" && model.status !== undefined && model.status !== '') {
        feature.status = model.status;
    }
    feature.updatedOn = new Date();
    log.end();
    feature.save();
    return feature;
};

const create = async (model, context) => {
    const log = context.logger.start("services:feature:create");
    if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
        throw new Error("you are not authorized, only Admin or superAdmin can add feature");
    }
    const isfeatureExist = await db.feature.findOne({ name: { $eq: model.name } });
    if (isfeatureExist) {
        throw new Error("feature is already exist");
    }
    const feature = build(model, context);
    log.end();
    return feature;
};


const getAllfeatures = async (context) => {
    const log = context.logger.start(`services:feature:getAllfeatures`);
    const features = await db.feature.find();
    log.end();
    return features;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:feature:update`);
    if (!id) {
        throw new Error("feature id is required");
    }

    if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
        throw new Error("you are not authorized, only Admin or superAdmin can update feature");
    }
    let featureDetail = await db.feature.findById(id);
    if (!featureDetail) {
        throw new Error("feature not found");
    }
    const feature = await set(model, featureDetail, context);
    log.end();
    return feature
};

const deleteFeature = async (id, context) => {
    const log = context.logger.start(`services:feature:deleteFeature:${id}`);
    if (!id) {
        throw new Error("feature id is required");
    }
    if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
        throw new Error("you are not authorized, only Admin or superAdmin can delete feature");
    }
    await db.feature.deleteOne({ _id: id });
    log.end();
    return 'feature Deleted Successfully'
};

const getById = async (id, context) => {
    const log = context.logger.start(`services:feature:getById:${id}`);
    const feature = await db.feature.findById(id);
    log.end();
    return feature;
};

exports.create = create;
exports.getAllfeatures = getAllfeatures;
exports.update = update;
exports.deleteFeature = deleteFeature;
exports.getById = getById;