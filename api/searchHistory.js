"use strict";
const service = require("../services/searchHistory");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:searchHistory:create`);
    try {
        const search = await service.create(req.body, req.context);
        log.end();
        return response.data(res, search);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getsearcHistoryOfUser = async (req, res) => {
    const log = req.context.logger.start(`api:searchHistory:getsearcHistoryOfUser:${req.query.userId}`);
    try {
        const search = await service.getsearcHistoryOfUser(req.query, req.context);
        log.end();
        return response.data(res, search);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteSearchById = async (req, res) => {
    const log = req.context.logger.start(`api:search:deleteSearchById`);
    try {
        const search = await service.deleteSearchById(req.query, req.context);
        log.end();
        return response.data(res, search);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const allClear = async (req, res) => {
    const log = req.context.logger.start(`api:search:allClear:${req.params.id}`);
    try {
        const search = await service.allClear(req.params.id, req.context);
        log.end();
        return response.data(res, search);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.getsearcHistoryOfUser = getsearcHistoryOfUser;
exports.deleteSearchById = deleteSearchById;
exports.allClear = allClear;