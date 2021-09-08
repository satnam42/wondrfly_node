"use strict";
const service = require("../services/invitation");
const response = require("../exchange/response");
const mapper = require("../mappers/invitation");


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

const list = async (req, res) => {
    const log = req.context.logger.start(`api:invitation:list`);
    try {
        const invitations = await service.getAllInvitation(req.context);
        let message = invitations.count ? invitations.count : 0 + " " + "All invitation";
        log.end();
        return response.invitation(
            message,
            res,
            mapper.toSearchModel(invitations.invitation),
            invitations.accepted,
            invitations.pending);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const approveAll = async (req, res) => {
    const log = req.context.logger.start(`api:invitation:approveAll`);
    try {
        const invitation = await service.approveAll(req.body, req.context);
        log.end();
        return response.data(res, invitation);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.askToJoin = askToJoin;
exports.list = list;
exports.approveAll = approveAll;