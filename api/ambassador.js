"use strict";
const service = require("../services/ambassador");
const response = require("../exchange/response");


const addOrRemove = async (req, res) => {
    const log = req.context.logger.start(`api:ambassador:addOrRemove`);
    try {
        const ambassador = await service.addOrRemove(req.body, req.context);
        log.end();
        return response.data(res, ambassador);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getAmbassadors = async (req, res) => {
    const log = req.context.logger.start(`api:ambassador:getAmbassadors`);
    try {
        const user = await service.getAmbassadors(req.body, req.context);
        const message = "Ambassadors get Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const addActivities = async (req, res) => {
    const log = req.context.logger.start(`api:ambassador:addActivities`);
    try {
        const activity = await service.addActivities(req.body, req.context);
        log.end();
        return response.data(res, activity);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getActivities = async (req, res) => {
    const log = req.context.logger.start(`api:ambassador:getActivities`);
    try {
        const user = await service.getActivities(req.body, req.context);
        const message = "Activitites get Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const addActivityPoint = async (req, res) => {
    const log = req.context.logger.start(`api:ambassador:addActivityPoint`);
    try {
        const activity = await service.addActivityPoint(req.body, req.context);
        log.end();
        return response.data(res, activity);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const updateActivity = async (req, res) => {
    const log = req.context.logger.start(`api:ambassador:updateActivity:${req.params.id}`);
    try {
        const product = await service.updateActivity(req.params.id, req.body, req.context);
        let message = 'Activity updated successfully'
        log.end();
        return response.success(res, message, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteActivity = async (req, res) => {
    const log = req.context.logger.start(`api:ambassador:deleteActivity:${req.params.id}`);
    try {
        const activity = await service.deleteActivity(req.params.id, req.context);
        log.end();
        return response.data(res, activity);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.getAmbassadors = getAmbassadors;
exports.addOrRemove = addOrRemove;
exports.addActivities = addActivities;
exports.getActivities = getActivities;
exports.addActivityPoint = addActivityPoint;
exports.deleteActivity = deleteActivity;
exports.updateActivity = updateActivity;