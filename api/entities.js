"use strict";
const service = require("../services/entities");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:entities:create`);
    try {
        const entity = await service.create(req.body, req.context);
        log.end();
        return response.data(res, entity);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const list = async (req, res) => {
    const log = req.context.logger.start(`api:entity:list`);
    try {
        const entities = await service.getAllEntities(req.context);
        log.end();
        return response.data(res, entities);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.create = create;
exports.list = list;
