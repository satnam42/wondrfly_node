"use strict";
const response = require("../exchange/response");

const assign = (req, res, next) => {
    const log = req.context.logger.start("validators:permission:assign");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is equired");
    }
    if (!req.body.entityId) {
        log.end();
        return response.failure(res, "entityId is required");
    }
    if (!req.body.userId) {
        log.end();
        return response.failure(res, "userId is required");
    }
    if (!req.body.permissionTypeId) {
        log.end();
        return response.failure(res, "permissionTypeId is required");
    }
    log.end();
    return next();
};
const permissionType = (req, res, next) => {
    const log = req.context.logger.start("validators:permission:permissionType");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is equired");
    }
    if (!req.body.type) {
        log.end();
        return response.failure(res, "type is required");
    }

    log.end();
    return next();
};

const deletePermission = (req, res, next) => {
    const log = req.context.logger.start("validators:permission:deletePermission");

    if (!req.query.userId) {
        log.end();
        return response.failure(res, "userId is required");
    }
    if (!req.query.permissionTypeId) {
        log.end();
        return response.failure(res, "permissionTypeId is required");
    }
    if (!req.query.entityId) {
        log.end();
        return response.failure(res, "entityId is required");
    }

    log.end();
    return next();

}


exports.assign = assign;
exports.permissionType = permissionType;
exports.deletePermission = deletePermission;

