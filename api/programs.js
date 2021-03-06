"use strict";
const service = require("../services/programs");
const response = require("../exchange/response");
const mapper = require("../mappers/program")
// const mapperGrouping = require("../mappers/groupingPrograms")

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
        return response.data(res, mapper.toSearchModel(program));
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
        let message = data.count ? data.count : 0 + " " + "programs Got";
        log.end();
        return response.page(
            message,
            res,
            data,
            Number(req.query.pageNo) || 1,
            Number(req.query.pageSize) || 10,
            data.count
        );
        // return response.data(res, data);

        // return response.data(res, mapper.toSearchModel(data));
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

const subCategoryFilter = async (req, res) => {
    const log = req.context.logger.start(`api:programs:subCategoryFilter`);
    try {
        const data = await service.subCategoryFilter(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(data));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const countForCategory = async (req, res) => {
    const log = req.context.logger.start(`api:programs:countForCategory`);
    try {
        const data = await service.countForCategory(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(data));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const duplicateCreate = async (req, res) => {
    const log = req.context.logger.start(`api:programs:duplicateCreate:${req.params.id}`);
    try {
        const programs = await service.duplicateCreate(req.params.id, req.context);
        log.end();
        return response.data(res, programs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const childTagProgramCount = async (req, res) => {
    const log = req.context.logger.start(`api:programs:childTagProgramCount`);
    try {
        const data = await service.childTagProgramCount(req.query, req.context);
        log.end();
        return response.data(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const expireProgram = async (req, res) => {
    const log = req.context.logger.start(`api:programs:expireProgram`);
    try {
        const data = await service.expireProgram(req.body, req.context);
        log.end();
        return response.data(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const expiresInWeek = async (req, res) => {
    const log = req.context.logger.start(`api:programs:expiresInWeek`);
    try {
        const programs = await service.expiresInWeek(req.query, req.context);
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
const searchByKeyValue = async (req, res) => {
    const log = req.context.logger.start(`api:programs:searchByKeyValue`);
    try {
        const program = await service.searchByKeyValue(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(program));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const expired = async (req, res) => {
    const log = req.context.logger.start(`api:programs:expired`);
    try {
        const programs = await service.getExpiredprograms(req.query, req.context);
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
const montclairPrograms = async (req, res) => {
    const log = req.context.logger.start(`api:programs:montclairPrograms`);
    try {
        const programs = await service.montclairPrograms(req.query, req.context);
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

const histogram = async (req, res) => {
    const log = req.context.logger.start(`api:programs:histogram:${req.query.userId}`);
    try {
        const programs = await service.histogram(req.query, req.context);
        log.end();
        return response.data(res, programs);
        // response.data(res, programs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const groupPublishOrUnpublish = async (req, res) => {
    const log = req.context.logger.start(`api:programs:groupPublishOrUnpublish`);
    try {
        const programs = await service.groupPublishOrUnpublish(req.query, req.context);
        // let message = programs.count ? programs.count : 0 + " " + "programs Got";
        log.end();
        return response.data(res, programs);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const freeTrail = async (req, res) => {
    const log = req.context.logger.start(`api:programs:freeTrail`);
    try {
        const program = await service.freeTrail(req.query, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const programsByUser = async (req, res) => {
    const log = req.context.logger.start(`api:programs:programsByUser:${req.query.userId}`);
    try {
        const programs = await service.getProgramsByUser(req.query, req.context);
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

const bulkPublishOrUnpublish = async (req, res) => {
    const log = req.context.logger.start(`api:programs:bulkPublishOrUnpublish`);
    try {
        const program = await service.bulkPublishOrUnpublish(req.body, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const expiredByProvider = async (req, res) => {
    const log = req.context.logger.start(`api:programs:expiredByProvider:${req.query.userId}`);
    try {
        const programs = await service.getExpiredByProvider(req.query, req.context);
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

const bulkExpire = async (req, res) => {
    const log = req.context.logger.start(`api:programs:bulkExpire`);
    try {
        const program = await service.bulkExpire(req.body, req.context);
        log.end();
        return response.data(res, program);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const searchWithProviderId = async (req, res) => {
    const log = req.context.logger.start(`api:programs:searchWithProviderId`);
    try {
        const program = await service.searchWithProviderId(req.query, req.context);
        log.end();
        return response.data(res, mapper.toSearchModel(program));
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
exports.subCategoryFilter = subCategoryFilter;
exports.countForCategory = countForCategory;
exports.duplicateCreate = duplicateCreate;
exports.childTagProgramCount = childTagProgramCount
exports.expireProgram = expireProgram;
exports.expiresInWeek = expiresInWeek;
exports.searchByKeyValue = searchByKeyValue;
exports.expired = expired;
exports.montclairPrograms = montclairPrograms;
exports.histogram = histogram;
exports.groupPublishOrUnpublish = groupPublishOrUnpublish;
exports.freeTrail = freeTrail;
exports.programsByUser = programsByUser;
exports.bulkPublishOrUnpublish = bulkPublishOrUnpublish;
exports.expiredByProvider = expiredByProvider;
exports.bulkExpire = bulkExpire;
exports.searchWithProviderId = searchWithProviderId;