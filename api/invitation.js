"use strict";
const service = require("../services/invitation");
const response = require("../exchange/response");


const askToJoin = async (req, res) => {
    const log = req.context.logger.start(`api:invitation:askToJoin`);
    try {
        const invitation = await service.create(req.body, req.context);
        log.end();
        return response.data(res, invitation);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.askToJoin = askToJoin;