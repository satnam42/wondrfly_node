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
    const categoryId = model.categoryIds[0]
    const istagExist = await db.tag.findOne({ name: model.name, categoryIds: categoryId });
    if (istagExist) {
        return "tag already exist for this category";
    }
    const tag = build(model, context);
    log.end();
    return tag;
};
const getAlltags = async (context) => {
    const log = context.logger.start(`services:tags:getAlltags`);
    const tags = await db.tag.find({ isActivated: true }).populate('categoryIds').sort({ _id: -1 });
    log.end();
    return tags;
};
// const tagByCategoryId = async (categoriesId, context) => {
//     let ids = JSON.parse(categoriesId)// array like  "['1','2']"
//     if (ids.length < 0) {
//         throw new Error("category id not found");
//     } const log = context.logger.start(`services:tags:getAlltags`);
//     const tags = await db.tag.find({ categoryIds: { $in: ids } })
//     log.end();
//     return tags;
// };

const tagByCategoryId = async (categoriesId, context) => {
    const log = context.logger.start(`services:tags:tagByCategoryId`);
    if (!categoriesId) {
        throw new Error("category id not found");
    }
    let tags = []
    const subcategories = await db.tag.find({ categoryIds: categoriesId })
    for (var i = 0; i < subcategories.length; i++) {
        const tag = subcategories[i]
        const count = await db.program.find({ subCategoryIds: subcategories[i].id }).count()
        tag.programCount = count;
        tags.push(tag)
    }
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
const search = async (query, context) => {
    const log = context.logger.start(`services:tags:search`);
    const tags = await db.tag.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).limit(5).sort({ name: 1 });
    log.end();
    return tags;
};

const deleteTag = async (id, context) => {
    const log = context.logger.start(`services:tags:deleteTag:${id}`);
    if (!id) {
        throw new Error("tag id is required");
    }
    await db.tag.deleteOne({ _id: id });
    log.end();
    return 'Tag is Deleted Successfully'
};

const activateAndDeactive = async (context, id, isActivated) => {
    const log = context.logger.start(`services:tags:activateAndDeactive`);
    // if (context.user.role != 'superAdmin') {
    //   throw new Error("you are not authorized to perform this operation");
    // }
    if (!id) {
        throw new Error("tag id is requried");
    }
    if (!isActivated) {
        throw new Error("isActivated requried");
    }
    let tag = await db.tag.findById(id);
    if (!tag) {
        throw new Error("tag not found");
    }
    tag.isActivated = isActivated
    tag.updatedOn = Date.now()
    tag.save()
    log.end();
    return tag
};

exports.create = create;
exports.getAlltags = getAlltags;
exports.update = update;
exports.tagByCategoryId = tagByCategoryId
exports.search = search
exports.deleteTag = deleteTag;
exports.activateAndDeactive = activateAndDeactive;