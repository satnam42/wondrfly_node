"use strict";
const service = require("../services/comments");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:comments:create`);
    try {
        const comment = await service.createComment(req.body, req.context);
        log.end();
        return response.data(res, comment);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:comments:update:${req.params.id}`);
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

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:comments:update:${req.params.id}`);
    try {
        const comment = await service.removeComment(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, comment);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getById = async (req, res) => {
    const log = req.context.logger.start(`api:comments:getById:${req.params.id}`);
    try {
        const comment = await service.getById(req.params.id, req.context);
        log.end();
        return response.data(res, comment);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.update = update;
exports.remove = remove;
exports.getById = getById;

