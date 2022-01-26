"use strict";
let path = require('path');
const imageUrl = require('config').get('image').url;
const fs = require('fs');

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
    const log = context.logger.start(`services:tags:getAlltags`); ``
    // const tags = await db.tag.find({}).populate('categoryIds').sort({ _id: -1 });
    // { isActivated: { $ne: false } }
    let tags = []
    const subcategories = await db.tag.find({}).populate('categoryIds');
    for (var i = 0; i < subcategories.length; i++) {
        const tag = subcategories[i]
        const count = await db.program.find({ subCategoryIds: subcategories[i].id }).count()
        tag.programCount = count;
        tags.push(tag)
    }
    tags.sort((a, b) => b.programCount - a.programCount);
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
    tags.sort((a, b) => b.programCount - a.programCount);
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
    const allData = {}
    const tags = await db.tag.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).limit(5).sort({ name: 1 });
    const category = await db.category.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).limit(2).sort({ name: 1 });
    allData.tags = tags
    allData.category = category
    log.end();
    return allData;
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

const uploadImage = async (id, file, context) => {
    const log = context.logger.start(`services:tags:uploadImage`);
    let tag = await db.tag.findById(id);
    if (!file) {
        throw new Error('image not found');
    }
    if (!tag) {
        throw new Error('tag not found');
    }
    if (tag.image != '' && tag.image !== undefined) {
        // let picUrl = tag.image.replace(`${imageUrl}`, '');
        let picUrl = tag.image;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
            console.log('File unlinked!');
        } catch (err) {
            console.log(err);
        }
    }
    // const avatarImages = imageUrl  'assets/images/'  file.filename
    const image = imageUrl + file.filename;
    tag.image = image;
    await tag.save();
    log.end();
    return tag;

    // const avatarImages = imageUrl + 'assets/images/' + file.filename
    // for (let file of files) {
    //     if (file.fieldname == "image") {
    //         console.log('file.fieldname', file.fieldname)
    //         const image = imageUrl + file.filename;
    //         tag.image = image;
    //         await tag.save();
    //     }
    //     if (file.fieldname == "icon") {
    //         console.log('file.fieldname', file.fieldname)

    //         const icon = imageUrl + file.filename;
    //         tag.icon = icon;
    //         await tag.save();
    //     }
    //     if (file.fieldname == "image") {
    //         console.log('file.fieldname', file.fieldname)

    //         const logo = imageUrl + file.filename;
    //         tag.logo = logo;
    //         await tag.save();
    //     }
    // }

};


const uploadIcon = async (id, file, context) => {
    const log = context.logger.start(`services:tags:uploadIcon`);
    let tag = await db.tag.findById(id);
    if (!file) {
        throw new Error('image not found');
    }
    if (!tag) {
        throw new Error('tag not found');
    }
    if (tag.icon != '' && tag.icon !== undefined) {
        let picUrl = tag.icon;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
            console.log('File unlinked!');
        } catch (err) {
            console.log(err);
        }
    }
    const icon = imageUrl + file.filename;
    tag.icon = icon;
    await tag.save();
    log.end();
    return tag;
};
const uploadLogo = async (id, file, context) => {
    const log = context.logger.start(`services:tags:uploadLogo`);
    let tag = await db.tag.findById(id);
    if (!file) {
        throw new Error('image not found');
    }
    if (!tag) {
        throw new Error('tag not found');
    }
    if (tag.logo != '' && tag.logo !== undefined) {
        let picUrl = tag.logo;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
            console.log('File unlinked!');
        } catch (err) {
            console.log(err);
        }
    }
    const logo = imageUrl + file.filename;
    tag.logo = logo;
    await tag.save();
    log.end();
    return tag;
};

const uploadPattern = async (id, file, context) => {
    const log = context.logger.start(`services:tags:uploadPattern`);
    let tag = await db.tag.findById(id);
    if (!file) {
        throw new Error('image not found');
    }
    if (!tag) {
        throw new Error('tag not found');
    }
    if (tag.pattern != '' && tag.pattern !== undefined) {
        let picUrl = tag.pattern;
        let fullpath = path.join(__dirname, '../', 'assets/') + `${picUrl}`;
        try {
            await fs.unlinkSync(fullpath);
            console.log('File unlinked!');
        } catch (err) {
            console.log(err);
        }
    }
    const pattern = imageUrl + file.filename;
    tag.pattern = pattern;
    await tag.save();
    log.end();
    return tag;
};

exports.create = create;
exports.getAlltags = getAlltags;
exports.update = update;
exports.tagByCategoryId = tagByCategoryId
exports.search = search
exports.deleteTag = deleteTag;
exports.activateAndDeactive = activateAndDeactive;
exports.uploadImage = uploadImage;
exports.uploadIcon = uploadIcon;
exports.uploadLogo = uploadLogo;
exports.uploadPattern = uploadPattern;