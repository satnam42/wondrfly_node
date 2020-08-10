"use strict";
const service = require("../services/claims");
const response = require("../exchange/response");

const request = async (req, res) => {
    const log = req.context.logger.start(`api:claims:create`);
    try {
        const favourite = await service.createRequest(req.body, req.context);
        log.end();
        return response.data(res, favourite);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const requestList = async (req, res) => {
    const log = req.context.logger.start(`api:claims:requestList`);
    try {
        const claims = await service.getRequestList(req.context);
        log.end();
        return response.data(res, claims);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const requestListByProvider = async (req, res) => {
    const log = req.context.logger.start(`api:claims:requestListByProvider`);
    try {
        const claims = await service.getRequestListByProvider(req.query, req.context);
        log.end();
        return response.data(res, claims);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const actionOnRequest = async (req, res) => {
    const log = req.context.logger.start(`api:claims:actionOnRequest`);
    try {
        const favourite = await service.actionOnRequest(req.body, req.context);
        log.end();
        return response.data(res, favourite);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.request = request;
exports.requestList = requestList;
exports.requestListByProvider = requestListByProvider;
exports.actionOnRequest = actionOnRequest;
