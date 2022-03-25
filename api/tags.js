
"use strict";
const service = require("../services/tags");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:tags:create`);
    try {
        const tag = await service.create(req.body, req.context);
        log.end();
        return response.data(res, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const list = async (req, res) => {
    const log = req.context.logger.start(`api:tags:list`);
    try {
        const tags = await service.getAlltags(req.context);
        log.end();
        return response.data(res, tags);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const tagByCategoryId = async (req, res) => {
    const log = req.context.logger.start(`api:tags:list`);
    try {
        const tags = await service.tagByCategoryId(req.query.catrgoryIds, req.context);
        log.end();
        return response.data(res, tags);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const update = async (req, res) => {
    const log = req.context.logger.start(`api:tags:update:${req.params.id}`);
    try {
        const tag = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const search = async (req, res) => {
    const log = req.context.logger.start(`api:tags:search`);
    try {
        const tags = await service.search(req.query, req.context);
        log.end();
        return response.data(res, tags);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:tags:remove:${req.params.id}`);
    try {
        const tag = await service.deleteTag(req.params.id, req.context);
        log.end();
        return response.data(res, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const activeOrDeactive = async (req, res) => {
    const log = req.context.logger.start(`api:tags:activeOrDeactive`);
    try {
        const tag = await service.activateAndDeactive(req.context, req.query.id, req.query.isActivated);
        log.end();
        return response.data(res, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const uploadImage = async (req, res) => {
    const log = req.context.logger.start(`api:tags:uploadImage`);
    try {
        const tag = await service.uploadImage(req.params.id, req.file, req.context);
        const message = "Image uploaded Successfully";
        log.end();
        return response.success(res, message, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};
const uploadIcon = async (req, res) => {
    const log = req.context.logger.start(`api:tags:uploadIcon`);
    try {
        const tag = await service.uploadIcon(req.params.id, req.file, req.context);
        const message = "Icon uploaded Successfully";
        log.end();
        return response.success(res, message, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const uploadLogo = async (req, res) => {
    const log = req.context.logger.start(`api:tags:uploadLogo`);
    try {
        const tag = await service.uploadLogo(req.params.id, req.file, req.context);
        const message = "Logo uploaded Successfully";
        log.end();
        return response.success(res, message, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const uploadPattern = async (req, res) => {
    const log = req.context.logger.start(`api:tags:uploadPattern`);
    try {
        const tag = await service.uploadPattern(req.params.id, req.file, req.context);
        const message = "Pattern uploaded Successfully";
        log.end();
        return response.success(res, message, tag);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const searchTags = async (req, res) => {
    const log = req.context.logger.start(`api:tags:searchTags`);
    try {
        const tags = await service.searchTags(req.query, req.context);
        log.end();
        return response.data(res, tags);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.update = update;
exports.tagByCategoryId = tagByCategoryId;
exports.search = search;
exports.remove = remove;
exports.activeOrDeactive = activeOrDeactive;
exports.uploadImage = uploadImage;
exports.uploadIcon = uploadIcon;
exports.uploadLogo = uploadLogo;
exports.uploadPattern = uploadPattern;
exports.searchTags = searchTags;