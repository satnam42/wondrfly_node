"use strict";
const service = require("../services/child");
const response = require("../exchange/response");


const add = async (req, res) => {
    const log = req.context.logger.start(`api:parents:add`);
    try {
        const parent = await service.addParent(req.body, req.context);
        const message = "child added Successfully";
        log.end();
        return response.success(res, message, parent);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:parents:get`);
    try {
        const parents = await service.get(req.query, req.context);
        let message = parents.count ? parents.count : 0 + " " + "parent Got";
        log.end();
        return response.page(
            message,
            res,
            parents,
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            parents.count
        );
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const update = async (req, res) => {
    const log = req.context.logger.start(`api:parents:update:${req.params.id}`);
    try {
        const parent = await service.updateParent(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, parent);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.add = add;
exports.list = list;
exports.update = update;