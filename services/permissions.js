"use strict";
const build = async (model, context) => {
    const { type, code } = model;
    const log = context.logger.start(`services:permissionType:build${model}`);
    const entity = await new db.address({
        type: type,
        code: code,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return entity;
};

const create = async (model, context) => {
    const log = context.logger.start("services:permission:create");
    const isPermissionType = await db.permissionType.findOne({ type: { $eq: model.type } });
    if (isPermissionType) {
        return "PermissionType already  exist";
    }
    const permissionType = build(model, context);
    log.end();
    return permissionType;
};

const getAllPermissionType = async (context) => {
    const log = context.logger.start(`services:entity:getAllEntities`);
    const permissionTypes = await db.permissionType.find();
    log.end();
    return permissionTypes;
};

exports.create = create
exports.getAllPermissionType = getAllPermissionType