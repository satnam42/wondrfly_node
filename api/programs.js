"use strict";
const service = require("../services/programs");
const response = require("../exchange/response");
const mapper = require("../mappers/program")


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
        const programs = await service.getAllprograms(req.query, req.context);
        let message = programs.count ? programs.count : 0 + " " + "programs Got";
        log.end();
        return response.page(
            message,
            res,
            mapper.toSearchModel(programs),
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            programs.count
        );
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getById = async (req, res) => {
    const log = req.context.logger.start(`api:programs:getById:${req.params.id}`);
    try {
        const program = await service.getById(req.params.id, req.context);
        log.end();
        return response.data(res, mapper.toModel(program));
        // return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:programs:update:${req.params.id}`);
    try {
        const program = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:programs:remove:${req.params.id}`);
    try {
        const programs = await service.removeById(req.params.id, req.context);
        log.end();
        return response.data(res, programs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const uploadTimelinePics = async (req, res) => {
    const log = req.context.logger.start(`api:programs:uploadTimelinePics`);
    try {
        const user = await service.uploadTimelinePics(req.params.id, req.files, req.context);
        const message = "uploaded TimeLine Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const search = async (req, res) => {
    const log = req.context.logger.start(`api:programs:search`);
    try {
        const program = await service.search(req.query, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const programsByProvider = async (req, res) => {
    const log = req.context.logger.start(`api:programs:programsByProvider:${req.query.userId}`);
    try {
        const programs = await service.getProgramsByProvider(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(programs));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const addProgramAction = async (req, res) => {
    const log = req.context.logger.start(`api:programs:addProgramAction`);
    try {
        const view = await service.addProgramAction(req.body, req.context);
        log.end();
        return response.data(res, view);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const viewsByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:programs:viewsByProgramId:${req.query.userId}`);
    try {
        const views = await service.getViewCount(req.query, req.context);
        log.end();
        return response.data(res, views);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const programCountByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:programs:clicksByProgramId:${req.query.id}`);
    try {
        const clicks = await service.getProgramCount(req.query, req.context);
        log.end();
        return response.data(res, clicks);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const activeOrDecactive = async (req, res) => {
    const log = req.context.logger.start(`api:programs:setActiveOrDecactive:${req.query.id}`);
    try {
        const program = await service.setActiveOrDecactive(req.query, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const graphData = async (req, res) => {
    const log = req.context.logger.start(`api:programs:graphData:${req.query.userId}`);
    try {
        const data = await service.getGraphData(req.query, req.context);
        log.end();
        return response.data(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const filter = async (req, res) => {
    const log = req.context.logger.start(`api:programs:filter`);
    try {
        const data = await service.getFilterProgram(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(data));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const importProgram = async (req, res) => {
    const log = req.context.logger.start(`api:programs:create`);
    try {
        const program = await service.importProgram(req.file, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getProgramsByDate = async (req, res) => {
    const log = req.context.logger.start(`api:providers:getProgramsByDate`);
    try {
        const providers = await service.getProgramsByDate(req.query, req.context);
        log.end();
        return response.data(res, providers);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const publishedOrUnPublishedPrograms = async (req, res) => {
    const log = req.context.logger.start(`api:programs:publishedOrUnPublishedPrograms`);
    try {
        const program = await service.publishedOrUnPublishedPrograms(req.query, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const openPrograms = async (req, res) => {
    const log = req.context.logger.start(`api:programs:openPrograms`);
    try {
        const programs = await service.openPrograms(req.query, req.context);
        let message = programs.count ? programs.count : 0 + " " + "programs Got";
        log.end();
        return response.page(
            message,
            res,
            programs,
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            programs.count
        );
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const publish = async (req, res) => {
    const log = req.context.logger.start(`api:programs:publish`);
    try {
        const program = await service.publish(req.query, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const listPublishOrUnpublish = async (req, res) => {
    const log = req.context.logger.start(`api:programs:listPublishOrUnpublish`);
    try {
        const programs = await service.listPublishOrUnpublish(req.query, req.context);
        let message = programs.count ? programs.count : 0 + " " + "programs Got";
        log.end();
        return response.page(
            message,
            res,
            mapper.toSearchModel(programs),
            // programs,
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            programs.count
        );
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const searchByNameAndDate = async (req, res) => {
    const log = req.context.logger.start(`api:programs:searchByNameAndDate`);
    try {
        const data = await service.searchByNameAndDate(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(data));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const uploadExcel = async (req, res) => {
    const log = req.context.logger.start(`api:programs:uploadExcel`);
    try {
        const url = await service.uploadExcel(req.file, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const topRating = async (req, res) => {
    const log = req.context.logger.start(`api:programs:topRating`);
    try {
        const programs = await service.topRating(req.context);
        log.end();
        // return response.data(res, programs);
        return response.data(res, mapper.toSearchModel(programs));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const multiFilter = async (req, res) => {
    const log = req.context.logger.start(`api:programs:multiFilter`);
    try {
        const data = await service.multiFilter(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(data));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const nearBy = async (req, res) => {
    const log = req.context.logger.start(`api:programs:nearBy`);
    try {
        const data = await service.nearBy(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(data));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.list = list;
exports.update = update;
exports.getById = getById;
exports.remove = remove;
exports.uploadTimelinePics = uploadTimelinePics;
exports.search = search;
exports.programsByProvider = programsByProvider;
exports.addProgramAction = addProgramAction;
exports.viewsByUserId = viewsByUserId;
exports.programCountByUserId = programCountByUserId;
exports.activeOrDecactive = activeOrDecactive;
exports.graphData = graphData;
exports.filter = filter;
exports.importProgram = importProgram;
exports.getProgramsByDate = getProgramsByDate;
exports.publishedOrUnPublishedPrograms = publishedOrUnPublishedPrograms;
exports.openPrograms = openPrograms;
exports.publish = publish;
exports.listPublishOrUnpublish = listPublishOrUnpublish;
exports.searchByNameAndDate = searchByNameAndDate;
exports.uploadExcel = uploadExcel;
exports.topRating = topRating;
exports.multiFilter = multiFilter;
exports.nearBy = nearBy;