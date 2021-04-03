"use strict";

const { query } = require("express");

const create = async (model, context) => {
    const log = context.logger.start("services:searchHistory:create");
    db.searchHistory.update({ _id: 1 }, { $pop: { searchhistories: -1 } })
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