"use strict";
const service = require("../services/searchTopics");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:searchTopics:create`);
    try {
        const searchTopics = await service.create(req.body, req.context);
        log.end();
        return response.data(res, searchTopics);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:searchTopics:list`);
    try {
        const searchTopics = await service.getAllsearchTopics(req.context);
        log.end();
        return response.data(res, searchTopics);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:searchTopics:update`);
    try {
        const searchTopics = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, searchTopics);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:searchTopics:remove:${req.params.id}`);
    try {
        const alert = await service.deleteSearchTopic(req.params.id, req.context);
        log.end();
        return response.data(res, alert);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const search = async (req, res) => {
    const log = req.context.logger.start(`api:searchTopics:search`);
    try {
        const searchTopics = await service.search(req.query, req.context);
        log.end();
        return response.data(res, searchTopics);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const activeOrDeactive = async (req, res) => {
    const log = req.context.logger.start(`api:searchTopics:activeOrDeactive`);
    try {
        const keyword = await service.activateAndDeactive(req.context, req.query.id, req.query.isActivated);
        log.end();
        return response.data(res, keyword);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.update = update;
exports.remove = remove;
exports.search = search;
exports.activeOrDeactive = activeOrDeactive;