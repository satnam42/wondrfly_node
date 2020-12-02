"use strict";
const service = require("../services/alert");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:alert:create`);
    try {
        const alert = await service.create(req.body, req.context);
        log.end();
        return response.data(res, alert);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:alert:list`);
    try {
        const alert = await service.getAllalert(req.context);
        log.end();
        return response.data(res, alert);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:alert:update`);
    try {
        const alert = await service.update(req.body, req.context);
        log.end();
        return response.data(res, alert);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteAlert = async (req, res) => {
    const log = req.context.logger.start(`api:alert:deleteAlert:${req.params.id}`);
    try {
        const user = await service.deleteAlert(req.params.id, req.context);
        log.end();
        return response.data(res, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



exports.create = create;
exports.list = list;
exports.update = update;
exports.deleteAlert = deleteAlert;