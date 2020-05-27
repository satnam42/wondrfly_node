"use strict";
const service = require("../services/parents");
const response = require("../exchange/response");


const add = async (req, res) => {
    const log = req.context.logger.start(`api:parents:add`);
    try {
        const parent = await service.addParent(req.body, req.context);
        const message = "Parent added Successfully";
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
            parentMapper.toSearchModel(parents),
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
        return response.data(res, parentMapper.toModel(parent));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const resetPassword = async (req, res) => {
    const log = req.context.logger.start("api:parents:resetPassword");
    try {
        const message = await service.resetPassword(req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const uploadProfilePic = async (req, res) => {

    const log = req.context.logger.start(`api:parents:create`);
    try {
        const parent = await service.uploadProfilePic(req, req.context);
        const message = "Profile Picture Successfully";
        log.end();
        return response.success(res, message, parent);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteParent = async (req, res) => {
    const log = req.context.logger.start(`api:parents:recentAddedByRole`);
    try {
        const parent = await service.deleteParent(req.context, req.query.id);
        log.end();
        return response.data(res, parent);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const activeOrDeactive = async (req, res) => {
    const log = req.context.logger.start(`api:parents:recentAddedByRole`);
    try {
        const count = await service.setparentstatus(req.context, req.query.id, req.query.status);
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
exports.resetPassword = resetPassword;
exports.uploadProfilePic = uploadProfilePic;
exports.deleteParent = deleteParent
exports.activeOrDeactive = activeOrDeactive
