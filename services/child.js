const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const path = require("path");
const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;

const setChild = (model, child, context) => {
    const log = context.logger.start("services:childs:set");
    if (model.firstName !== "string" && model.firstName !== undefined) {
        child.firstName = model.firstName;
    }
    if (model.age !== "string" && model.age !== undefined) {
        child.age = model.age;
    }
    if (model.avtar !== "string" && model.avtar !== undefined) {
        child.avtar = model.avtar;
    }
    if (model.sex !== "string" && model.sex !== undefined) {
        child.sex = model.sex;
    }
    if (model.contactOtherInfo !== "string" && model.contactOtherInfo !== undefined) {
        child.contactOtherInfo = model.contactOtherInfo;
    }
    if (model.schoolInfo !== "string" && model.schoolInfo !== undefined) {
        child.schoolInfo = model.schoolInfo;
    }
    if (model.interestInfo !== "string" && model.interestInfo !== undefined) {
        child.interestInfo = model.interestInfo;
    }
    if (model.dislikes !== "string" && model.dislikes !== undefined) {
        child.dislikes = model.dislikes;
    }
    if (model.alergies !== "string" && model.alergies !== undefined) {
        child.alergies = model.alergies;
    }
    if (model.parentNotes !== "string" && model.parentNotes !== undefined) {
        child.parentNotes = model.parentNotes;
    }
    child.lastModifiedBy = context.user.id
    child.updateOn = new Date()
    log.end();
    child.save();
    return child;
};

const buildChild = async (model, context) => {
    const log = context.logger.start(`services:childs:build${model}`);
    const child = await new db.child({
        firstName: model.firstName,
        age: model.age,
        avtar: model.avtar,
        sex: model.sex,
        contactOtherInfo: model.contactOtherInfo,
        schoolInfo: model.schoolInfo,
        interestInfo: model.interestInfo,
        dislikes: model.dislikes,
        alergies: model.alergies,
        parent: model.parentId,
        parentNotes: model.parentNotes,
        createdBy: context.user.id,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return child;
};


const addChild = async (model, context) => {
    const log = context.logger.start("services:childs:create");
    const child = buildChild(model, context);
    log.end();
    return child;
};


const get = async (query, context) => {
    const log = context.logger.start(`services:childs:get`);
    let childs = await db.child.find({})
    log.end();
    return childs;
};


const updateChild = async (id, model, context) => {
    const log = context.logger.start(`services:childs:update`);

    let entity = await db.child.findById(id);
    if (!entity) {
        throw new Error("child Not Found");
    }

    const child = await setChild(model, entity, context);

    log.end();
    return child
};
const childByParentId = async (id, context) => {
    const log = context.logger.start(`services:childs:update`);

    let children = await db.child.find({ parent: id })
    if (!children) {
        throw new Error("child Not Found");
    }

    log.end();
    return children
};
exports.addChild = addChild;
exports.get = get;
exports.updateChild = updateChild;
exports.childByParentId = childByParentId;