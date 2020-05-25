"use strict";
const service = require("../services/reviews");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:reviwes:create`);
    try {
        const review = await service.create(req.body, req.context);
        log.end();
        return response.data(res, review);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const reviewsByProgramId = async (req, res) => {
    const log = req.context.logger.start(`api:reviews:list`);
    try {
        const reviews = await service.reviewsByProgramId(req.query, req.context);
        message = reviews.count + " " + "review Got";
        log.end();
        return response.page(message, res, reviews, Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            reviews.count);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:reviews:update:${req.params.id}`);
    try {
        const review = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, userMapper.toModel(review));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.reviewsByProgramId = reviewsByProgramId;
exports.update = update;
