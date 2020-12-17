"use strict";

const build = async (model, context) => {
    const { name, icon, description } = model;
    console.log('model in badge servide', model);
    const log = context.logger.start(`services:badge:build${model}`);
    const badge = await new db.badge({
        name: name,
        icon: icon,
        description: description,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return badge;
};

const setBadge = async (model, badge, context) => {
    const log = context.logger.start("services:badge:set");
    if (model.name !== "string" && model.name !== undefined) {
        badge.name = model.name;
    }
    if (model.icon !== "string" && model.icon !== undefined) {
        badge.icon = model.icon;
    }
    if (model.description !== "string" && model.description !== undefined) {
        badge.description = model.description;
    }

    log.end();
    await badge.save();
    return badge;
}

const create = async (model, context) => {
    const log = context.logger.start("services:badge:create");
    const isbadgeExist = await db.badge.findOne({ name: { $eq: model.name } });
    if (isbadgeExist) {
        throw new Error("badge is already exist");
    }

    const badge = build(model, context);
    log.end();
    return badge;
};

const getAllBadges = async (context) => {
    const log = context.logger.start(`services:alert:getAllBadges`);
    const alerts = await db.badge.find();
    log.end();
    return alerts;
};

const update = async (model, context) => {
    const log = context.logger.start(`services:badge:update`);
    if (!model.badgeId) {
        throw new Error("badge id is required");
    }

    let entity = await db.badge.findOne({ _id: model.badgeId });
    if (!entity) {
        throw new Error("invalid alert");
    }
    const badge = await setBadge(model, entity, context);
    log.end();
    return badge
};

const deleteBadge = async (id, context) => {
    const log = context.logger.start(`services:badge:deleteBadge:${id}`);
    if (!id) {
        throw new Error("badge id is required");
    }
    await db.badge.deleteOne({ _id: id });
    log.end();
    return 'badge Deleted Successfully'
};



exports.create = create;
exports.getAllBadges = getAllBadges;
exports.update = update;
exports.deleteBadge = deleteBadge;