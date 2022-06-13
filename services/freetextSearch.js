"use strict";

const freetextSearch = async (query, context) => {
    const log = context.logger.start(`services:filterkeys:freetextSearch`);
    const freetextSearch = await new db.freetextSearch({
        text: query.text,
        parentId: query.parentId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    let keywords = []
    var words = query.text.split(" ");
    for (var i = 0; i < words.length; i++) {
        const str = words[i];
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        let entity = await db.filterkeys.findOne({ keywordName: str2 }).limit(1);
        if (entity) {
            keywords.push(entity)
        }
    }
    log.end();
    return keywords;
};

const getAllfreetextSearch = async (context) => {
    const log = context.logger.start(`services:filterkeys:getAllfreetextSearch`);
    const freetextSearch = await db.freetextSearch.find()
    log.end();
    return freetextSearch;
};

exports.freetextSearch = freetextSearch;
exports.getAllfreetextSearch = getAllfreetextSearch;