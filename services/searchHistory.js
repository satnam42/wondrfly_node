"use strict";

const create = async (model, context) => {
    const log = context.logger.start("services:searchHistory:create");
    const search = await new db.searchHistory({
        user: model.userId,
        searchData: model.searchData,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return search;
};

const getsearcHistoryOfUser = async (query, context) => {
    const log = context.logger.start(`services:alert:getsearcHistoryOfUser`);
    const search = await db.searchHistory.find({ user: query.userId }).sort({ createdOn: -1 }).limit(10);
    log.end();
    return search;
};

exports.create = create;
exports.getsearcHistoryOfUser = getsearcHistoryOfUser;