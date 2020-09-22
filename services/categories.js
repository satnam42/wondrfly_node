

"use strict";
const imageUrl = require('config').get('image').url
const fs = require('fs');

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
        throw new Error("category Not found");
    }
    const category = await set(model, isCategory, context);
    log.end();
    return category
};


const search = async (query, context) => {
    const log = context.logger.start(`services:categories:search`);
    const category = await db.category.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).limit(5).sort({ name: 1 });
    log.end();
    return category;

};

const uploadPic = async (id, file, context) => {

    const log = context.logger.start(`services:categories:uploadPic`);
    let category = await db.category.findById(id);

    if (!file) {
        throw new Error("image not found");
    }

    if (!category) {
        throw new Error("category not found");
    }

    if (category.imageUrl != "" && category.imageUrl !== undefined) {
        let image = category.imageUrl.replace(`${imageUrl}`, '');
        try {
            await fs.unlinkSync(`${image}`)
            console.log('File unlinked!');
        } catch (err) {
            console.log(err)
        }
    }
    const picUrl = imageUrl + file.filename
    category.imageUrl = picUrl
    await category.save();
    log.end();
    return category
};

const removeById = async (id, model, context) => {
    const log = context.logger.start(`services:categories:removeById`);
    if (!id) {
        throw new Error("category id not found");
    }
    let isDeleted = await db.category.deleteOne({ _id: id })
    if (!isDeleted) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'category deleted succesfully'
};

exports.create = create;
exports.getAllcategories = getAllcategories;
exports.update = update;
exports.search = search;
exports.uploadPic = uploadPic;
exports.removeById = removeById