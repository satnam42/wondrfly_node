"use strict";
const service = require("../services/likes");
const response = require("../exchange/response");

const add = async (req, res) => {
    const log = req.context.logger.start(`api:likes:create`);
    try {
        const like = await service.like(req.body, req.context);
        log.end();
        return response.data(res, like);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:likes:remove`);
    try {
        const like = await service.UnLike(req.query, req.context);
        log.end();
        return response.data(res, like);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.add = add;
exports.remove = remove;
