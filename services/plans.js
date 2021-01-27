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

const setPlan = async (model, plan, context) => {
    const log = context.logger.start("services:posts:setPlan");
    if (model.title !== "string" && model.title !== undefined && model.title !== '') {
        plan.title = model.title;
    }
    if (model.description !== "string" && model.description !== undefined && model.description !== '') {
        plan.description = model.description;
    }
    if (model.price !== "string" && model.price !== undefined && model.price !== '') {
        plan.price = model.price;
    }
    if (model.features && model.features.length !== 0) {
        if (model.features[0].id !== 'string' && model.features[0].id !== '' && model.features[0].id !== undefined) {
            plan.features = model.features
        }
    }

    plan.updatedOn = new Date()
    log.end();
    await plan.save();
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

const getAllplans = async (context) => {
    const log = context.logger.start(`services:plans:getAllplans`);
    const plans = await db.plans.find().populate('features.id');
    log.end();
    return plans;
};

const getById = async (id, context) => {
    const log = context.logger.start(`services:plans:getById:${id}`);
    const user = await db.plans.findById(id).populate('features.id');
    log.end();
    return user;
};


const update = async (id, model, context) => {
    const log = context.logger.start(`services:plans:update`);
    if (!id) {
        throw new Error("plan id is required");
    }
    if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
        throw new Error("you are not authorized, only Admin or superAdmin can update plan");
    }
    let entity = await db.plans.findById(id);
    if (!entity) {
        throw new Error("plan not exist");
    }
    const plan = await setPlan(model, entity, context);
    log.end();
    return plan
};

const deletePlan = async (id, context) => {
    const log = context.logger.start(`services:plans:deletePlan:${id}`);
    if (!id) {
        throw new Error("plan id is required");
    }
    if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
        throw new Error("you are not authorized, only Admin or superAdmin can delete plan");
    }
    await db.plans.deleteOne({ _id: id });
    log.end();
    return 'plan is Deleted Successfully'
};

const updateStatus = async (id, query, context) => {
    const log = context.logger.start(`services:plans:update`);

    if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
        throw new Error("you are not authorized, only Admin or superAdmin can update status");
    }
    let isPlanExist = await db.plans.findById(id);
    if (!isPlanExist) {
        throw new Error("invalid plan");
    }
    isPlanExist.status = query.status
    await isPlanExist.save()
    log.end();
    return isPlanExist
};

exports.create = create;
exports.getAllplans = getAllplans;
exports.getById = getById;
exports.update = update;
exports.deletePlan = deletePlan;
exports.updateStatus = updateStatus;