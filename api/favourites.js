"use strict";
const service = require("../services/favourites");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:favourites:create`);
    try {
        const favourite = await service.create(req.body, req.context);
        log.end();
        return response.data(res, favourite);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:favourites:list`);
    try {
        const favourites = await service.getAllfavourites(req.context);
        log.end();
        return response.data(res, favourites);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const listByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:favourites:listByUserId`);
    try {
        const favourites = await service.getFavouritesByUserId(req.query, req.context);
        log.end();
        return response.data(res, favourites);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:favourites:remove:${req.params.id}`);
    try {
        const favourite = await service.removeById(req.params.id, req.context);
        log.end();
        return response.data(res, favourite);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.remove = remove;
exports.listByUserId = listByUserId;
