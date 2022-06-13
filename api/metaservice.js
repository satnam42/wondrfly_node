"use strict";
const service = require("../services/metaservice");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:metaservice:create`);
    try {
        const metaservice = await service.create(req.body, req.context);
        log.end();
        return response.data(res, metaservice);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:metaservice:list`);
    try {
        const metaservice = await service.getAllmetaservice(req.context);
        log.end();
        return response.data(res, metaservice);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:metaservice:update`);
    try {
        const metaservice = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, metaservice);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:metaservice:remove:${req.params.id}`);
    try {
        const alert = await service.deleteMetaservice(req.params.id, req.context);
        log.end();
        return response.data(res, alert);
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