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


exports.search = search
exports.list = list