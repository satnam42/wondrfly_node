"use strict";
const service = require("../services/freetextSearch");
const response = require("../exchange/response");

const search = async (req, res) => {
    const log = req.context.logger.start(`api:freetextSearch:search`);
    try {
        const freetextSearch = await service.freetextSearch(req.query, req.context);
        log.end();
        return response.data(res, freetextSearch);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
}

const list = async (req, res) => {
    const log = req.context.logger.start(`api:freetextSearch:list`);
    try {
        const freetextSearch = await service.getAllfreetextSearch(req.context);
        log.end();
        return response.data(res, freetextSearch);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const listByParentId = async (req, res) => {
    const log = req.context.logger.start(`api:freetextSearch:listByParentId:${req.params.id}`);
    try {
        const freetextSearch = await service.listByParentId(req.params.id, req.context);
        log.end();
        return response.data(res, freetextSearch);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:freetextSearch:remove:${req.params.id}`);
    try {
        const alert = await service.deleteFreetext(req.params.id, req.context);
        log.end();
        return response.data(res, alert);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.search = search
exports.list = list
exports.listByParentId = listByParentId
exports.remove = remove;