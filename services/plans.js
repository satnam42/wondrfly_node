"use strict";

const build = async (model, context) => {
    const log = context.logger.start(`services:plans:build${model}`);
    let buildModel = {
        title: model.title.toLowerCase(),
        description: model.description,
        status: 'active',
        price: model.price,
        createdOn: new Date(),
        updatedOn: new Date()
    }
    if (model.features && model.features.length !== 0) {
        if (model.features[0].id !== 'string' && model.features[0].id !== '' && model.features[0].id !== undefined) {
            buildModel.features = model.features
        }
    }
    const plan = await new db.plans(buildModel).save();
    log.end();
    return plan;
};


const create = async (model, context) => {
    const log = context.logger.start("services:plans:create");
    if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
        throw new Error("you are not authorized to perform this operation");
    }
    const isplanExist = await db.plans.findOne({ title: { $eq: model.title } });
    if (isplanExist) {
        throw new Error("plan is already exist");
    }
    const plan = build(model, context);
    log.end();
    return plan;
};

exports.create = create;