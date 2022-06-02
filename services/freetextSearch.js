"use strict";

const freetextSearch = async (query, context) => {
    const log = context.logger.start(`services:filterkeys:freetextSearch`);
    const freetextSearch = await new db.freetextSearch({
        text: query.text,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return freetextSearch;
};

const getAllfreetextSearch = async (context) => {
    const log = context.logger.start(`services:filterkeys:getAllfreetextSearch`);
    const freetextSearch = await db.freetextSearch.find()
    log.end();
    return freetextSearch;
};

exports.freetextSearch = freetextSearch;
exports.getAllfreetextSearch = getAllfreetextSearch;