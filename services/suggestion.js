"use strict";
const baseUrl = require('config').get('image').baseUrl

const build = async (model, context) => {
    const { suggestedId, suggestedTags } = model;
    const log = context.logger.start(`services:suggestion:build${model}`);
    const suggestion = await new db.suggested({
        suggestedId,
        suggestedTags,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return suggestion;
};

const create = async (model, context) => {
    const log = context.logger.start("services:suggestion:create");
    // const issuggestionExist = await db.suggestion.findOne({ name: model.name[0], subcategoires: model.subcategoires[0] });
    // if (issuggestionExist) {
    //     return "suggestion already exist for this category";
    // }
    console.log('suggestion service api hit!!!');
    const suggestion = build(model, context);
    log.end();
    return suggestion;
};

const bySubcategoryId = async (id, context) => {
    const log = context.logger.start(`services:suggestion:bySubcategoryId`);
    if (!id) throw new Error('subcategory id is required')
    const suggestion = await db.suggestion.findOne({ subcategoires: id }).populate('subcategoires');
    if (!suggestion) {
        throw new Error("suggestion does not exist")
    }
    const finalSuggestion = []
    if (suggestion) {
        const suggestions = suggestion.subcategoires;
        const category = await db.category.findById(suggestion.category)
        const imageUrl = category.imageUrl ? baseUrl + category.imageUrl : ''
        const iconUrl = category.iconUrl ? baseUrl + category.iconUrl : ''
        suggestions.map(suggestion => {
            let newSuggestion = {}
            newSuggestion.id = suggestion.id
            newSuggestion.name = suggestion.name
            newSuggestion.imageUrl = imageUrl
            newSuggestion.iconUrl = iconUrl
            finalSuggestion.push(newSuggestion)
        });
        return finalSuggestion;
    }
};

exports.create = create;
exports.bySubcategoryId = bySubcategoryId;