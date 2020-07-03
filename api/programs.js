"use strict";
const service = require("../services/programs");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:programs:create`);
    try {
        const program = await service.create(req.body, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:programs:list`);
    try {
        const programs = await service.getAllprograms(req.context);
        log.end();
        return response.data(res, programs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// const update = async (req, res) => {
//     const log = req.context.logger.start(`api:programs:update:${req.params.id}`);
//     try {
//         const program = await service.update(req.params.id, req.body, req.context);
//         log.end();
//         return response.data(res, program);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

// const search = async (req, res) => {
//     const log = req.context.logger.start(`api:programs:search`);
//     try {
//         const program = await service.search(req.query, req.context);
//         log.end();
//         return response.data(res, program);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };
exports.create = create;
exports.list = list;
// exports.update = update;
// exports.search = search;
