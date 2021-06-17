"use strict";
const service = require("../services/reports");
const response = require("../exchange/response");

const search = async (req, res) => {
    const log = req.context.logger.start(`api:reports:getProgramsByDate`);
    try {
        const reposts = await service.search(req.query, req.context);
        log.end();
        return response.data(res, reposts);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.search = search;