"use strict";
const service = require("../services/tags");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:tags:create`);
    try {
        const tag = await service.create(req.body, req.context);
        log.end();
        return response.data(res, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const list = async (req, res) => {
    const log = req.context.logger.start(`api:tags:list`);
    try {
        const tags = await service.getAlltags(req.context);
        log.end();
        return response.data(res, tags);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const tagByCategoryId = async (req, res) => {
    const log = req.context.logger.start(`api:tags:list`);
    try {
        const tags = await service.tagByCategoryId(req.query.catrgoryIds, req.context);
        log.end();
        return response.data(res, tags);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const update = async (req, res) => {
    const log = req.context.logger.start(`api:tags:update:${req.params.id}`);
    try {
        const tag = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.create = create;
exports.list = list;
exports.update = update;
exports.tagByCategoryId = tagByCategoryId;
