"use strict";
const service = require("../services/feature");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:feature:create`);
    try {
        const feature = await service.create(req.body, req.context);
        log.end();
        return response.data(res, feature);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:feature:list`);
    try {
        const feature = await service.getAllfeatures(req.context);
        log.end();
        return response.data(res, feature);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:feature:update:${req.params.id}`);
    try {
        const comment = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, comment);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.update = update;
