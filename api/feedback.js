"use strict";
const service = require("../services/feedback");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:feedback:create`);
    try {
        const feedback = await service.create(req.body, req.context);
        log.end();
        return response.data(res, feedback);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:feedback:list`);
    try {
        const feedback = await service.getAllfeedback(req.context);
        log.end();
        return response.data(res, feedback);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;