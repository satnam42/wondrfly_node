"use strict";

const build = async (model, context) => {
    const { module, permission } = model;
    const log = context.logger.start(`services:permission:build${model}`);
    const entity = await new db.permission({
        module: module,
        permission: permission,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return entity;
};

const assignPermission = async (model, context) => {
    const { permissionId, roles } = model;
    const log = context.logger.start(`services:permissionType:build${model}`);
    const permission = await new db.permission({
        permissionId: permissionId,
        roles: roles,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return permission;
};
const create = async (model, context) => {
    const log = context.logger.start("services:permission:create");
    const isPermission = await db.permission.findOne({ $and: [{ permission: model.permission }, { module: model.module }] });
    if (isPermission) {
        return "Permission already  exist";
    }
    const permission = build(model, context);
    log.end();
    return permission;
};

const assign = async (model, context) => {
    const log = context.logger.start("services:permission:assign");
    let role = context.user.role
    if (!role) {
        throw new Error('role undefined')
    }
    if (role != 'superadmin') {
        throw new Error('you dont have right for this opreation')
    }
    const permission = assignPermission(model, context);
    log.end();
    return permission;
};

const deletePermission = async (query, context) => {
    const log = context.logger.start("services:permission:assign");
    let role = context.user.role
    if (!role) {
        throw new Error('role undefined')
    }
    if (role != 'superadmin') {
        throw new Error('you dont have right for this opreation')
    }
    const permission = await db.permission.findOne({ "$and": [{ entityId: query.entityId }, { permissionTypeId: query.permissionTypeId }, { userId: query.userId }] });
    permission.isDeleted = true;
    permission.updatedOn = Date.now()
    permission.save()
    log.end();
    return permission;
};

const getAllPermission = async (context) => {
    const log = context.logger.start(`services:entity:getAllEntities`);
    const permission = await db.permission.find();
    log.end();
    return permission;
};

exports.create = create;
exports.getAllPermission = getAllPermission;
exports.assign = assign;
exports.deletePermission = deletePermission;