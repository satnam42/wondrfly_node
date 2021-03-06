"use strict";
const service = require("../services/twilio");
const response = require("../exchange/response");


const sendOtpSMS = async (req, res) => {
    const log = req.context.logger.start(`api:twilio:create`);
    try {
        const data = await service.sendOtpSMS(req.body, req.context);
        log.end();
        return response.data(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const otpVerify = async (req, res) => {
    const log = req.context.logger.start("api:twilio:otpVerify");
    try {
        const data = await service.otpVerify(req.body, req.context);
        log.end();
        return response.success(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.sendOtpSMS = sendOtpSMS;
exports.otpVerify = otpVerify;