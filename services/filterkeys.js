"use strict";
const build = async (model, context) => {
    const { keywordName, keywordType, keywordValue, isActivated } = model;
    const log = context.logger.start(`services:filterkeys:build${model}`);
    const filterkeys = await new db.filterkeys({
        keywordName: keywordName,
        keywordType: keywordType,
        keywordValue: keywordValue,
        isActivated: isActivated,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return filterkeys;
};

const setAlert = async (model, filterkeys, context) => {
    const log = context.logger.start("services:filterkeys:set");
    if (model.keywordName !== "string" && model.keywordName !== undefined) {
        filterkeys.keywordName = model.keywordName;
    }
    if (model.keywordType !== "string" && model.keywordType !== undefined) {
        filterkeys.keywordType = model.keywordType;
    }
    if (model.keywordValue !== "string" && model.keywordValue !== undefined) {
        filterkeys.keywordValue = model.keywordValue;
    }
    if (model.isActivated !== "string" && model.isActivated !== undefined) {
        filterkeys.isActivated = model.isActivated;
    }
    log.end();
    await filterkeys.save();
    return filterkeys;
}

const create = async (model, context) => {
    const log = context.logger.start("services:filterkeys:create");
    // const isfilterkeysExist = await db.filterkeys.findOne({ msg: { $eq: model.msg } });
    // if (isfilterkeysExist) {
    //     throw new Error("filterkey is already exist");
    // }
    const filterkeys = build(model, context);
    log.end();
    return filterkeys;
};

const getAllfilterkeys = async (context) => {
    const log = context.logger.start(`services:filterkeys:getAllfilterkeys`);
    const filterkeyss = await db.filterkeys.find({})
    log.end();
    return filterkeyss;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:filterkeys:update`);
    if (!id) {
        throw new Error("filterkey id is required");
    }

    let entity = await db.filterkeys.findOne({ _id: id });
    if (!entity) {
        throw new Error("invalid filterkeys");
    }
    const filterkeys = await setAlert(model, entity, context);
    log.end();
    return filterkeys
};

const deleteFilterkey = async (id, context) => {
    const log = context.logger.start(`services:filterkeys:deleteFilterkey:${id}`);
    if (!id) {
        throw new Error("filterkey id is required");
    }
    await db.filterkeys.deleteOne({ _id: id });
    log.end();
    return 'filterkey Deleted Successfully'
};

const search = async (query, context) => {
    const log = context.logger.start(`services:filterkeys:search`);
    const filterkeys = await db.filterkeys.find({ keywordName: { "$regex": '.*' + query.name + '.*', "$options": 'i' }, isActivated: true }
    ).limit(5).sort({ name: 1 });
    log.end();
    return filterkeys;
};

const activateAndDeactive = async (context, id, isActivated) => {
    const log = context.logger.start(`services:filterkeys:activateAndDeactive`);
    if (!id) {
        throw new Error('Id is requried');
    }
    if (!isActivated) {
        throw new Error('isActivated requried');
    }
    let keyword = await db.filterkeys.findById(id);
    if (!keyword) {
        throw new Error('keyword not found');
    }
    keyword.isActivated = isActivated;
    keyword.lastModifiedBy = context.user.id;
    keyword.updatedOn = Date.now();
    keyword.save();
    log.end();
    return keyword;
};

exports.create = create;
exports.getAllfilterkeys = getAllfilterkeys;
exports.update = update;
exports.deleteFilterkey = deleteFilterkey;
exports.search = search;
exports.activateAndDeactive = activateAndDeactive;