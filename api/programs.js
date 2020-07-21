"use strict";
const service = require("../services/programs");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:programs:create`);
    try {
        const program = await service.create(req.body, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:programs:list`);
    try {
        const programs = await service.getAllprograms(req.query, req.context);
        let message = programs.count ? programs.count : 0 + " " + "programs Got";
        log.end();
        return response.page(
            message,
            res,
            programs,
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            programs.count
        );
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getById = async (req, res) => {
    const log = req.context.logger.start(`api:programs:getById:${req.params.id}`);
    try {
        const programs = await service.getById(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, programs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:programs:update:${req.params.id}`);
    try {
        const program = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:programs:remove:${req.params.id}`);
    try {
        const programs = await service.removeById(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, programs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const uploadTimelinePics = async (req, res) => {
    const log = req.context.logger.start(`api:programs:uploadTimelinePics`);
    try {
        const user = await service.uploadTimelinePics(req.params.id, req.files, req.context);
        const message = "uploaded TimeLine Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const search = async (req, res) => {
    const log = req.context.logger.start(`api:programs:search`);
    try {
        const program = await service.search(req.query, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.create = create;
exports.list = list;
exports.update = update;
exports.getById = getById;
exports.remove = remove;
exports.uploadTimelinePics = uploadTimelinePics;
exports.search = search;
