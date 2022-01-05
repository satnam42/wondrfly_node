"use strict";
const baseUrl = require('config').get('image').baseUrl
const ObjectId = require('mongodb').ObjectID

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
    const suggestion = await db.suggested.aggregate([
        {
            $match: {
                suggestedId: ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'suggestedTags',
                foreignField: '_id',
                as: 'tags',
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'tags.categoryIds',
                foreignField: '_id',
                as: 'category',
            },
        },
    ])
    if (suggestion.length == 0 || suggestion[0].tags.length == 0) {
        throw new Error("suggestion does not exist")
    }
    const finalSuggestion = []
    if (suggestion) {
        const suggestions = suggestion[0].tags;
        const category = suggestion[0].category[0]
        const imageUrl = category.imageUrl ? baseUrl + category.imageUrl : ''
        const iconUrl = category.iconUrl ? baseUrl + category.iconUrl : ''
        const logoUrl = category.logoUrl ? baseUrl + category.logoUrl : ''
        for (const suggestion of suggestions) {
            const count = await db.program.count({ subCategoryIds: suggestion._id })
            if (count > 0) {
                let newSuggestion = {}
                newSuggestion.id = suggestion._id
                newSuggestion.name = suggestion.name
                newSuggestion.imageUrl = imageUrl
                newSuggestion.iconUrl = iconUrl
                newSuggestion.logoUrl = logoUrl
                finalSuggestion.push(newSuggestion)
            }
        }
    }
    log.end();
    return finalSuggestion;
};

exports.create = create;
exports.bySubcategoryId = bySubcategoryId;