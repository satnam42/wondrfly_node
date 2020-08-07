"use strict";
const service = require("../services/child");
const response = require("../exchange/response");

const getPicUrl = async (req, res) => {
    const log = req.context.logger.start(`api:uploads:getPicUrl`);
    try {
        const url = await service.getPicUrl(req.file, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }

};

exports.getPicUrl = getPicUrl;

