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


exports.getAmbassadors = getAmbassadors
exports.addOrRemove = addOrRemove;