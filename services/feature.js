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

const create = async (model, context) => {
    const log = context.logger.start("services:feature:create");
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


exports.create = create;
exports.getAllfeatures = getAllfeatures;