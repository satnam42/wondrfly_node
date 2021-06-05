"use strict";
const service = require("../services/categories");
const response = require("../exchange/response");
const categoryMapper = require("../mappers/category");



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
        return response.data(res, categoryMapper.toSearchModel(categories));
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

const search = async (req, res) => {
    const log = req.context.logger.start(`api:categories:search`);
    try {
        const category = await service.search(req.query, req.context);
        log.end();
        return response.data(res, categoryMapper.toSearchModel(category));

    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const uploadPic = async (req, res) => {

    const log = req.context.logger.start(`api:categories:uploadPic`);
    try {
        const category = await service.uploadPic(req.params.id, req.file, req.context);
        const message = " Picture uploaded Successfully";
        log.end();
        return response.success(res, message, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:categories:remove:${req.params.id}`);
    try {
        const category = await service.removeById(req.params.id, req.context);
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
exports.search = search;
exports.uploadPic = uploadPic;
exports.remove = remove;
