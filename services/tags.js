"use strict";
const build = async (model, context) => {
    const { name, description, categoryIds } = model;
    const log = context.logger.start(`services:tags:build${model}`);
    const tag = await new db.tag({
        name: name,
        description: description,
        categoryIds: categoryIds,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return tag;
};
const set = (model, tag, context) => {
    const log = context.logger.start("services:tags:set");
    if (model.name !== "string" && model.name !== undefined) {
        tag.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined) {
        tag.description = model.description;
    }
    if (model.categoryIds !== "string" && model.categoryIds !== undefined) {
        tag.categoryIds = model.categoryIds;
    }

    tag.updateOn = new Date()
    log.end();
    tag.save();
    return tag;
};
const create = async (model, context) => {
    const log = context.logger.start("services:tags:create");
    const istagExist = await db.tag.findOne({ name: { $eq: model.name } });
    if (istagExist) {
        return "tag already exist";
    }
    const tag = build(model, context);
    log.end();
    return tag;
};
const getAlltags = async (context) => {
    const log = context.logger.start(`services:tags:getAlltags`);
    const tags = await db.tag.find({}).populate('categoryIds')
    log.end();
    return tags;
};
const update = async (id, model, context) => {
    const log = context.logger.start(`services:tags:update`);
    let istag = await db.tag.findById(id);
    if (!istag) {
        throw new Error("invalid id");
    }
    const tag = await set(model, istag, context);
    log.end();
    return tag
};
exports.create = create;
exports.getAlltags = getAlltags;
exports.update = update;