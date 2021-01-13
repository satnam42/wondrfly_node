"use strict";
const service = require("../services/plans");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:plans:create`);
    try {
        const plan = await service.create(req.body, req.context);
        log.end();
        return response.data(res, plan);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;