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
    const log = context.logger.start(`services:searchHistory:getsearcHistoryOfUser`);
    const search = await db.searchHistory.find({ user: query.userId }).sort({ createdOn: -1 }).limit(10);
    log.end();
    return search;
};

const deleteSearchById = async (query, context) => {
    const log = context.logger.start(`services:searchHistory:deleteSearchById`);
    if (!query.id) {
        throw new Error("search id is required");
    }
    if (!query.userId) {
        throw new Error("user id is required");
    }
    await db.searchHistory.deleteOne({ _id: query.id, user: query.userId });
    log.end();
    return 'search is Deleted Successfully'
};

exports.create = create;
exports.getsearcHistoryOfUser = getsearcHistoryOfUser;
exports.deleteSearchById = deleteSearchById;