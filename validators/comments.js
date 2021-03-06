"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:comments:create");
    if (!req.body) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.postId) {
        log.end();
        return response.failure(res, "post Id is required");
    }
    if (!req.body.creator) {
        log.end();
        return response.failure(res, "user Id is required");
    }
    if (!req.body.creatorName) {
        log.end();
        return response.failure(res, "user Name is required");
    }
    if (!req.body.text) {
        log.end();
        return response.failure(res, "text is required");
    }

    log.end();
    return next();
};
exports.create = create;

