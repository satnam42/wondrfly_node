"use strict";
const imageUrl = require('config').get('image').url
const fs = require('fs');
const baseUrl = require('config').get('image').baseUrl
let path = require('path');

const build = async (model, context) => {
    const { name, imageUrl, iconUrl, logoUrl, description, alternativeText } = model;
    const log = context.logger.start(`services:categories:build${model}`);
    const category = await new db.category({
        name: name,
        imageUrl: imageUrl,
        iconUrl: iconUrl,
        logoUrl: logoUrl,
        description: description,
        alternativeText: alternativeText,
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
    if (model.imageUrl !== "string" && model.imageUrl !== undefined) {
        category.imageUrl = model.imageUrl;
    }
    if (model.iconUrl !== "string" && model.iconUrl !== undefined) {
        category.iconUrl = model.iconUrl;
    }
    if (model.logoUrl !== "string" && model.logoUrl !== undefined) {
        category.logoUrl = model.logoUrl;
    }
    if (model.alternativeText !== "string" && model.alternativeText !== undefined) {
        category.alternativeText = model.alternativeText;
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
    // const categories = await db.category.find().sort({ totalPrograms: -1 });
    // // { isActivated: true }
    // log.end();
    let categories = []
    const categries = await db.category.find();
    for (var i = 0; i < categries.length; i++) {
        const category = categries[i]
        const count = await db.program.find({ categoryId: category._id }).count()
        category.totalPrograms = count;
        categories.push(category)
    }
    await categories.sort((a, b) => b.totalPrograms - a.totalPrograms);
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
    if (!file) { throw new Error("image not found") }
    if (!category) { throw new Error("category not found") }

    if (category.imageUrl != "" && category.imageUrl !== undefined) {
        // let image = category.imageUrl.replace(`${imageUrl}`, '');
        let picUrl = category.imageUrl;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
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

const removeById = async (id, context) => {
    const log = context.logger.start(`services:categories:removeById`);
    if (!id) {
        throw new Error("category id not found");
    }
    await db.category.deleteOne({ _id: id })
    let isDeleted = await db.category.findById({ id })
    if (!isDeleted) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'category deleted succesfully'
};

const activateAndDeactive = async (context, id, isActivated) => {
    const log = context.logger.start(`services:categories:activateAndDeactive`);
    // if (context.user.role != 'superAdmin') {
    //   throw new Error("you are not authorized to perform this operation");
    // }
    if (!id) {
        throw new Error("category id is requried");
    }
    if (!isActivated) {
        throw new Error("isActivated requried");
    }
    let category = await db.category.findById(id);
    if (!category) {
        throw new Error("category not found");
    }
    category.isActivated = isActivated
    category.updatedOn = Date.now()
    category.save()
    log.end();
    return category
};

const uploadIcon = async (id, file, context) => {
    const log = context.logger.start(`services:categories:uploadIcon`);
    let category = await db.category.findById(id);
    if (!file) {
        throw new Error('image not found');
    }
    if (!category) {
        throw new Error('category not found');
    }
    if (category.iconUrl != '' && category.iconUrl !== undefined) {
        let picUrl = category.iconUrl;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
            console.log('File unlinked!');
        } catch (err) {
            console.log(err);
        }
    }
    const iconUrl = imageUrl + file.filename;
    category.iconUrl = iconUrl;
    await category.save();
    log.end();
    return category;
};

const uploadLogo = async (id, file, context) => {
    const log = context.logger.start(`services:categories:uploadLogo`);
    let category = await db.category.findById(id);
    if (!file) {
        throw new Error('image not found');
    }
    if (!category) {
        throw new Error('category not found');
    }
    if (category.logoUrl != '' && category.logoUrl !== undefined) {
        let picUrl = category.logoUrl;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
            console.log('File unlinked!');
        } catch (err) {
            console.log(err);
        }
    }
    const logoUrl = imageUrl + file.filename;
    category.logoUrl = logoUrl;
    await category.save();
    log.end();
    return category;
};

const uploadPattern = async (id, file, context) => {
    const log = context.logger.start(`services:categories:uploadPattern`);
    let category = await db.category.findById(id);
    if (!file) {
        throw new Error('image not found');
    }
    if (!category) {
        throw new Error('category not found');
    }
    if (category.pattern != '' && category.pattern !== undefined) {
        let picUrl = category.pattern;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
            console.log('File unlinked!');
        } catch (err) {
            console.log(err);
        }
    }
    const pattern = imageUrl + file.filename;
    category.pattern = pattern;
    await category.save();
    log.end();
    return category;
};

exports.create = create;
exports.getAllcategories = getAllcategories;
exports.update = update;
exports.search = search;
exports.uploadPic = uploadPic;
exports.removeById = removeById;
exports.activateAndDeactive = activateAndDeactive;
exports.uploadIcon = uploadIcon;
exports.uploadLogo = uploadLogo;
exports.uploadPattern = uploadPattern;