"use strict";
const build = async (model, context) => {
    const { kewordName, kewordType } = model;
    const log = context.logger.start(`services:filterkeys:build${model}`);
    const filterkeys = await new db.filterkeys({
        kewordName: kewordName,
        kewordType: kewordType,
        // filterkeysFor: filterkeysFor,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return filterkeys;
};

const setAlert = async (model, filterkeys, context) => {
    const log = context.logger.start("services:filterkeys:set");
    if (model.kewordName !== "string" && model.kewordName !== undefined) {
        filterkeys.kewordName = model.kewordName;
    }
    if (model.kewordType !== "string" && model.kewordType !== undefined) {
        filterkeys.kewordType = model.kewordType;
    }
    log.end();
    await filterkeys.save();
    return filterkeys;
}

const create = async (model, context) => {
    const log = context.logger.start("services:filterkeys:create");
    const isfilterkeysExist = await db.filterkeys.findOne({ msg: { $eq: model.msg } });
    if (isfilterkeysExist) {
        throw new Error("filterkey is already exist");
    }
    const filterkeys = build(model, context);
    log.end();
    return filterkeys;
};

const getAllfilterkeys = async (context) => {
    const log = context.logger.start(`services:filterkeys:getAllfilterkeys`);
    const filterkeyss = await db.filterkeys.find();
    log.end();
    return filterkeyss;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:users:update`);
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


exports.create = create;
exports.getAllfilterkeys = getAllfilterkeys;
exports.update = update;