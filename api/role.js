"use strict";
const service = require("../services/role");
const response = require("../exchange/response");


const create = async (req, res) => {
    const log = req.context.logger.start(`api:role:create`);
    try {
        const role = await service.create(req.body, req.context);
        log.end();
        return response.data(res, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:role:list`);
    try {
        const role = await service.getAllrole(req.context);
        log.end();
        return response.data(res, role);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.list = list;