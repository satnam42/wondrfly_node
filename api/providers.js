"use strict";
const service = require("../services/providers");
const response = require("../exchange/response");
const mapper = require("../mappers/provider")

const create = async (req, res) => {
    const log = req.context.logger.start(`api:provider:create`);
    try {
        const tag = await service.importProvider(req.file, req.context);
        log.end();
        return response.data(res, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:providers:list`);
    try {
        const providers = await service.getAllProvider(req.context);
        log.end();
        return response.data(res, providers);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:providers:update:${req.params.id}`);
    try {
        const provider = await service.updateProvider(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, provider);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



const uploadBannerPic = async (req, res) => {
    const log = req.context.logger.start(`api:provider:uploadBannerPic`);
    try {
        const user = await service.uploadBannerPic(req.params.id, req.files, req.context);
        const message = "upload Banner Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const getById = async (req, res) => {
    const log = req.context.logger.start(`api:providers:getById:${req.params.id}`);
    try {
        const provider = await service.getProvideById(req.params.id, req.context);
        log.end();
        return response.data(res, mapper.toModel(provider));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.update = update;
exports.uploadBannerPic = uploadBannerPic;
exports.getById = getById;


