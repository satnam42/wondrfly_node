"use strict";
const build = async (model, context) => {
    const { name, category, subcategoires } = model;
    const log = context.logger.start(`services:suggestion:build${model}`);
    const suggestion = await new db.suggestion({
        name: name,
        category: category,
        subcategoires: subcategoires,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return suggestion;
};

const create = async (model, context) => {
    const log = context.logger.start("services:suggestion:create");
    // const issuggestionExist = await db.suggestion.findOne({ name: model.name[0], subcategoires: model.subcategoires[0] });
    if (issuggestionExist) {
        return "suggestion already exist for this category";
    }
    console.log('suggestion service api hit!!!');
    const suggestion = build(model, context);
    log.end();
    return model;
};

exports.create = create;