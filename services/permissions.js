"use strict";
const build = async (model, context) => {
    const { type, code } = model;
    const log = context.logger.start(`services:permissionType:build${model}`);
    const entity = await new db.permissionType({
        type: type,
        code: code,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return entity;
};
const buildPermission = async (model, context) => {
    const { entityId, permissionTypeId, userId, status } = model;
    const log = context.logger.start(`services:permissionType:build${model}`);
    const entity = await new db.permission({
        entityId: entityId,
        permissionTypeId: permissionTypeId,
        userId: userId,
        status: status,
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

const assign = async (model, context) => {
    const log = context.logger.start("services:permission:assign");
    let role = context.user.role
    if (!role) {
        throw new Error('role undefined')
    }
    if (role != 'superAdmin') {
        throw new Error('you dont have right for this opreation')
    }
    const permission = buildPermission(model, context);
    log.end();
    return permission;
};
// const deletePermission = async (model, context) => {
//     const log = context.logger.start("services:permission:assign");
//     let role = context.user.role
//     if (!role) {
//         throw new Error('role undefined')
//     }
//     if (role != 'superAdmin') {
//         throw new Error('you dont have right for this opreation')
//     }
//     const permission = buildPermission(model, context);
//     log.end();
//     return permission;
// };

const getAllPermissionType = async (context) => {
    const log = context.logger.start(`services:entity:getAllEntities`);
    const permissionTypes = await db.permissionType.find();
    log.end();
    return permissionTypes;
};

exports.create = create;
exports.getAllPermissionType = getAllPermissionType;
exports.assign = assign;
// exports.deletePermission = deletePermission;