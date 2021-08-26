"use strict";
const service = require("../services/suggestion");
const response = require("../exchange/response");
const mapper = require("../mappers/suggestion");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:suggestion:create`);
    try {
        const suggestion = await service.create(req.body, req.context);
        log.end();
        return response.data(res, suggestion);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const bySubcategoryId = async (req, res) => {
    const log = req.context.logger.start(`api:suggestion:list`);
    try {
        const suggestions = await service.bySubcategoryId(req.params.id, req.context);
        log.end();
        return response.data(res, suggestions);
        // return response.data(res, mapper.toSearchModel(suggestions));

    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.bySubcategoryId = bySubcategoryId;