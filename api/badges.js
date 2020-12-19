"use strict";
const service = require("../services/badges");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:badges:create`);
    try {
        const badge = await service.create(req.body, req.context);
        log.end();
        return response.data(res, badge);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:badges:list`);
    try {
        const badge = await service.getAllBadges(req.context);
        log.end();
        return response.data(res, badge);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:badges:update`);
    try {
        const bdge = await service.update(req.body, req.context);
        log.end();
        return response.data(res, bdge);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteBadge = async (req, res) => {
    const log = req.context.logger.start(`api:badges:deleteBadge:${req.params.id}`);
    try {
        const badge = await service.deleteBadge(req.params.id, req.context);
        log.end();
        return response.data(res, badge);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.update = update;
exports.deleteBadge = deleteBadge;