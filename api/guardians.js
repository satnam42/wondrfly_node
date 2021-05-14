"use strict";
const service = require("../services/guardians");
const response = require("../exchange/response");
const guardianMapper = require("../mappers/guardian");
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
        log.end();
        return response.data(res, guardianMapper.toSearchModel(guardians));
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
        return response.data(res, guardianMapper.toSearchModel(guardians));
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

const sendOtp = async (req, res) => {
    const log = req.context.logger.start("api:guardians:sendOtp");
    try {
        const data = await service.sendOtp(req.body, req.context);
        log.end();
        return response.success(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const activeOrDeactive = async (req, res) => {
    const log = req.context.logger.start(`api:guardians:activeOrDeactive`);
    try {
        const count = await service.activateAndDeactive(req.context, req.query.id, req.query.isActivated);
        log.end();
        return response.data(res, count);
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
exports.sendOtp = sendOtp;
exports.activeOrDeactive = activeOrDeactive;