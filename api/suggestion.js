"use strict";
const service = require("../services/suggestion");
const response = require("../exchange/response");


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

exports.create = create;