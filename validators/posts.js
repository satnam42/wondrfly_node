"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:post:create");
    if (!req.body) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.title) {
        log.end();
        return response.failure(res, "title is required");
    }
    if (!req.body.description) {
        log.end();
        return response.failure(res, "description is required");
    }

    if (!req.body.tags.length) {
        log.end();
        return response.failure(res, "tags is required");
    }
    if (!req.body.user) {
        log.end();
        return response.failure(res, "user id is required");
    }


    log.end();
    return next();
};
exports.create = create;

