"use strict";
const service = require("../services/events");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:events:create`);
    try {
        const event = await service.create(req.body, req.context);
        log.end();
        return response.data(res, event);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const update = async (req, res) => {
    const log = req.context.logger.start(`api:events:update`);
    try {
        const event = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, event);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const listByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:event:list`);
    try {
        const events = await service.eventsByUserId(req.context);
        log.end();
        return response.data(res, events);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.create = create;
exports.listByUserId = listByUserId;
exports.update = update;
