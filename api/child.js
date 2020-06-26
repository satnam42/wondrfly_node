"use strict";
const service = require("../services/child");
const response = require("../exchange/response");


const add = async (req, res) => {
    const log = req.context.logger.start(`api:child:add`);
    try {
        const child = await service.addChild(req.body, req.context);
        const message = "child added Successfully";
        log.end();
        return response.success(res, message, child);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:child:get`);
    try {
        const child = await service.getList(req.query, req.context);
        let message = child.count ? child.count : 0 + " " + "child Got";
        log.end();
        return response.page(
            message,
            res,
            child,
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            child.count
        );
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const childByParentId = async (req, res) => {
    const log = req.context.logger.start(`api:child:update:${req.params.id}`);
    try {
        const children = await service.childByParentId(req.params.id, req.context);
        log.end();
        return response.data(res, children);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:child:update:${req.params.id}`);
    try {
        const child = await service.updateChild(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, child);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.add = add;
exports.list = list;
exports.update = update;
exports.childByParentId = childByParentId;