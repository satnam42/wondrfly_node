"use strict";
const build = async (model, context) => {
    const { Name, url } = model;
    const log = context.logger.start(`services:searchTopics:build${model}`);
    const searchTopic = await new db.searchtopic({
        Name,
        url,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return searchTopic;
};

const setAlert = async (model, searchTopics, context) => {
    const log = context.logger.start("services:searchTopics:set");
    if (model.Name !== "string" && model.Name !== undefined) {
        searchTopics.Name = model.Name;
    }
    if (model.url !== "string" && model.url !== undefined) {
        searchTopics.url = model.url;
    }
    log.end();
    await searchTopics.save();
    return searchTopics;
}

const create = async (model, context) => {
    const log = context.logger.start("services:searchTopics:create");
    // const issearchTopicsExist = await db.searchTopics.findOne({ msg: { $eq: model.msg } });
    // if (issearchTopicsExist) {
    //     throw new Error("filterkey is already exist");
    // }
    const searchTopics = build(model, context);
    log.end();
    return searchTopics;
};

const getAllsearchTopics = async (context) => {
    const log = context.logger.start(`services:searchTopics:getAllsearchTopics`);
    const searchTopicss = await db.searchtopic.find({})
    log.end();
    return searchTopicss;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:searchTopics:update`);
    if (!id) {
        throw new Error("search topic id is required");
    }

    let entity = await db.searchtopic.findOne({ _id: id });
    if (!entity) {
        throw new Error("invalid searchTopic");
    }
    const searchTopics = await setAlert(model, entity, context);
    log.end();
    return searchTopics
};

const deleteSearchTopic = async (id, context) => {
    const log = context.logger.start(`services:searchTopics:deleteSearchTopic:${id}`);
    if (!id) {
        throw new Error("search topic id is required");
    }
    await db.searchtopic.deleteOne({ _id: id });
    log.end();
    return 'search topic Deleted Successfully'
};

const search = async (query, context) => {
    const log = context.logger.start(`services:searchTopics:search`);
    const searchTopics = await db.searchtopic.find({ Name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).limit(5).sort({ name: 1 });
    log.end();
    return searchTopics;
};

const activateAndDeactive = async (context, id, isActivated) => {
    const log = context.logger.start(`services:searchTopics:activateAndDeactive`);
    if (!id) {
        throw new Error('Id is requried');
    }
    if (!isActivated) {
        throw new Error('isActivated requried');
    }
    let keyword = await db.searchtopic.findById(id);
    if (!keyword) {
        throw new Error('search topic not found');
    }
    keyword.isActivated = isActivated;
    keyword.lastModifiedBy = context.user.id;
    keyword.updatedOn = Date.now();
    keyword.save();
    log.end();
    return keyword;
};

exports.create = create;
exports.getAllsearchTopics = getAllsearchTopics;
exports.update = update;
exports.deleteSearchTopic = deleteSearchTopic;
exports.search = search;
exports.activateAndDeactive = activateAndDeactive;