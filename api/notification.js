"use strict";
const service = require("../services/notification");
const response = require("../exchange/response");

const showNotification = async (req, res) => {
    const log = req.context.logger.start(`api:notification:showNotification`);
    try {
        const notification = await service.showNotification(req.context);
        log.end();
        return response.data(res, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteNotification = async (req, res) => {
    const log = req.context.logger.start(`api:notification:deleteNotification:${req.query.id}`);
    try {
        const notification = await service.deleteNotification(req.query, req.context);
        log.end();
        return response.data(res, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const notificationOnOff = async (req, res) => {
    const log = req.context.logger.start(`api:notification:notificationOnOff`);
    try {
        const notification = await service.notificationOnOff(req.query, req.context);
        log.end();
        return response.data(res, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteAll = async (req, res) => {
    const log = req.context.logger.start(`api:notification:deleteAll:${req.query.id}`);
    try {
        const notification = await service.deleteAllNotification(req.query, req.context);
        log.end();
        return response.data(res, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const isRead = async (req, res) => {
    const log = req.context.logger.start(`api:notification:isRead:${req.params.id}`);
    try {
        const notification = await service.isRead(req.params.id, req.context);
        log.end();
        return response.data(res, notification);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.showNotification = showNotification;
exports.deleteNotification = deleteNotification;
exports.notificationOnOff = notificationOnOff;
exports.deleteAll = deleteAll;
exports.isRead = isRead;