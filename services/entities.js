
"use strict";
const build = async (model, context) => {
    const { name, code } = model;
    const log = context.logger.start(`services:entity:build${model}`);
    const entity = await new db.address({
        name: name,
        code: code,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return entity;
};

const create = async (model, context) => {
    const log = context.logger.start("services:entity:create");
    const isEntity = await db.entity.findOne({ name: { $eq: model.name } });
    if (isEntity) {
        return "Entity already  exist";
    }
    const entity = build(model, context);
    log.end();
    return entity;
};
const getAllEntities = async (context) => {
    const log = context.logger.start(`services:entity:getAllEntities`);
    const entities = await db.entity.find();
    log.end();
    return entities;
};

exports.create = create
exports.getAllEntities = getAllEntities