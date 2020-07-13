const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;
const fs = require('fs');
const setChild = async (model, child, context) => {
    const log = context.logger.start("services:childs:set");
    if (model.name !== "string" && model.name !== undefined) {
        child.name = model.name;
    }
    if (model.dob !== "string" && model.dob !== undefined) {
        child.dob = model.dob;
    }
    if (model.age !== "string" && model.age !== undefined) {
        child.age = model.age;
    }
    if (model.avtar !== "string" && model.avtar !== undefined) {
        if (model.avtar !== child.avtar) {
            let picUrl = child.avtar.replace(`${imageUrl}`, '');
            try {
                await fs.unlinkSync(`${picUrl}`)
                console.log('File unlinked!');
            } catch (err) {
                console.log(err)
            }
        }
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
        name: model.name,
        dob: model.dob,
        age: model.age,
        avtar: model.avtar,
        sex: model.sex,
        relationToChild: model.relationToChild,
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
    let isChild = await db.child.findOne({ $and: [{ parent: model.parentId }, { name: { "$regex": '^' + model.name, "$options": 'i' } }] });
    if (isChild) {
        throw new Error("child already exits with this name");
    }
    const log = context.logger.start("services:childs:create");
    const child = buildChild(model, context);
    log.end();
    return child;
};


const getList = async (query, context) => {
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

const deleteChild = async (context, id) => {
    const log = context.logger.start(`services:child:deleteChild`);
    if (!id) {
        throw new Error("childId is requried");
    }

    let child = await db.child.findById(id);

    if (!child) {
        throw new Error("child not found");
    }
    child.isDeleted = true
    child.updatedOn = Date.now()
    child.deletedBy = context.user.id
    child.save()
    log.end();
    return child

};

const uploadChildPic = async (file, context) => {
    const log = context.logger.start(`services:child:uploadChildPic`);
    if (!file) {
        throw new Error("image not found");
    }

    const avatarImages = imageUrl + 'assets/images/' + file.filename
    log.end();
    return avatarImages
};

exports.addChild = addChild;
exports.getList = getList;
exports.updateChild = updateChild;
exports.childByParentId = childByParentId;
exports.deleteChild = deleteChild
exports.uploadChildPic = uploadChildPic