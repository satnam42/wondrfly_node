"use strict";
const service = require("../services/justfeedback");
const response = require("../exchange/response");
const feedbackMapper = require("../mappers/justfeedback");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:justfeedback:create`);
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
    const log = req.context.logger.start(`api:justfeedback:list`);
    try {
        const feedback = await service.getAllfeedback(req.context);
        log.end();
        return response.data(res, feedbackMapper.toSearchModel(feedback));

    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:justfeedback:update`);
    try {
        const feedback = await service.update(req.body, req.context);
        log.end();
        return response.data(res, feedback);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteFeedback = async (req, res) => {
    const log = req.context.logger.start(`api:justfeedback:deleteFeedback:${req.params.id}`);
    try {
        const feedback = await service.deleteFeedback(req.params.id, req.context);
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
exports.update = update;
exports.deleteFeedback = deleteFeedback;