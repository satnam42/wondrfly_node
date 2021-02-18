"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:events:create");
    if (!req.body.title) {
        log.end();
        return response.failure(res, "title is required");
    }
    if (!req.body.date.from) {
        log.end();
        return response.failure(res, "from date is required");
    }
    if (!req.body.date.to) {
        log.end();
        return response.failure(res, "from date is required");
    }
    log.end();
    return next();
};


// const update = (req, res, next) => {
//     const log = req.context.logger.start("validators:events:update");

//     if (!req.body) {
//         log.end();
//         return response.failure(res, "body is required");
//     }
//     if (!req.params.id) {
//         log.end();
//         return response.failure(res, "event id is required");
//     }

//     log.end();
//     return next();
// };


exports.create = create;
// exports.update = update;
