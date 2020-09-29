"use strict";
const service = require("../services/guardians");
const response = require("../exchange/response");


const add = async (req, res) => {
    const log = req.context.logger.start(`api:guardian:add`);
    try {
        const guardian = await service.addGuardian(req.body, req.context);
        const message = "guardian added Successfully";
        log.end();
        return response.success(res, message, guardian);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};




const list = async (req, res) => {
    const log = req.context.logger.start(`api:guardians:list`);
    try {
        const guardians = await service.get(req.query, req.context);
        let message = guardians.count ? guardians.count : 0 + " " + "guardians Got";
        log.end();
        return response.page(
            message,
            res,
            guardians,
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            guardians.count
        );
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const update = async (req, res) => {
    const log = req.context.logger.start(`api:guardians:update:${req.params.id}`);
    try {
        const guardian = await service.updateGuardian(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, guardian);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getGuardianByParentId = async (req, res) => {
    const log = req.context.logger.start(`api:guardians:getGuardianByParentId:${req.params.id}`);
    try {
        const guardians = await service.getGuardianByParentId(req.params.id, req.context);
        log.end();
        return response.data(res, guardians);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:guardians:update:${req.params.id}`);
    try {
        const guardian = await service.deleteGuardian(req.params.id, req.context);
        log.end();
        return response.data(res, guardian);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.add = add;
exports.list = list;
exports.update = update;
exports.getGuardianByParentId = getGuardianByParentId;
exports.remove = remove;