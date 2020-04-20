"use strict";
const service = require("../services/permissions");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:permissions:create`);
    try {
        const entity = await service.create(req.body, req.context);
        log.end();
        return response.data(res, entity);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:permission:list`);
    try {
        const permissionTypes = await service.getAllPermissionType(req.context);
        log.end();
        return response.data(res, permissionTypes);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const assignPermission = async (req, res) => {
    const log = req.context.logger.start(`api:permissions:create`);
    try {
        const permissions = await service.assign(req.body, req.context);
        log.end();
        return response.data(res, permissions);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.list = list;
exports.assignPermission = assignPermission
