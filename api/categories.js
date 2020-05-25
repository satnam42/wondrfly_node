"use strict";
const service = require("../services/categories");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:categories:create`);
    try {
        const category = await service.create(req.body, req.context);
        log.end();
        return response.data(res, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const list = async (req, res) => {
    const log = req.context.logger.start(`api:categories:list`);
    try {
        const categories = await service.getAllcategories(req.context);
        log.end();
        return response.data(res, categories);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const update = async (req, res) => {
    const log = req.context.logger.start(`api:categories:update:${req.params.id}`);
    try {
        const category = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.create = create;
exports.list = list;
exports.update = update;
