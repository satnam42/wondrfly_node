
"use strict";
const build = async (model, context) => {
    const { name, description } = model;
    const log = context.logger.start(`services:categories:build${model}`);
    const category = await new db.category({
        name: name,
        description: description,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return category;
};
const set = (model, category, context) => {
    const log = context.logger.start("services:categories:set");
    if (model.name !== "string" && model.name !== undefined) {
        category.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined) {
        category.description = model.description;
    }

    category.updateOn = new Date()
    log.end();
    category.save();
    return category;
};
const create = async (model, context) => {
    const log = context.logger.start("services:categories:create");
    const isCategoryExist = await db.category.findOne({ name: { $eq: model.name } });
    if (isCategoryExist) {
        return "category already exist";
    }
    const category = build(model, context);
    log.end();
    return category;
};
const getAllcategories = async (context) => {
    const log = context.logger.start(`services:categories:getAllcategories`);
    const categories = await db.category.find();
    log.end();
    return categories;
};
const update = async (id, model, context) => {
    const log = context.logger.start(`services:categories:update`);
    let isCategory = await db.category.findById(id);
    if (!isCategory) {
        throw new Error("invalid id");
    }
    const category = await set(model, category, context);
    log.end();
    return user
};
exports.create = create;
exports.getAllcategories = getAllcategories;
exports.update = update;