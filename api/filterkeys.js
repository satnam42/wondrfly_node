"use strict";
const service = require("../services/filterkeys");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:filterkeys:create`);
    try {
        const filterkeys = await service.create(req.body, req.context);
        log.end();
        return response.data(res, filterkeys);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:filterkeys:list`);
    try {
        const filterkeys = await service.getAllfilterkeys(req.context);
        log.end();
        return response.data(res, filterkeys);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:filterkeys:update`);
    try {
        const filterkeys = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, filterkeys);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteFilterkey = async (req, res) => {
    const log = req.context.logger.start(`api:filterkeys:deleteFilterkey:${req.params.id}`);
    try {
        const alert = await service.deleteFilterkey(req.params.id, req.context);
        log.end();
        return response.data(res, alert);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const search = async (req, res) => {
    const log = req.context.logger.start(`api:filterkeys:search`);
    try {
        const filterkeys = await service.search(req.query, req.context);
        log.end();
        return response.data(res, filterkeys);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.update = update;
exports.deleteFilterkey = deleteFilterkey;
exports.search = search;