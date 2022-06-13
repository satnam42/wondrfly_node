"use strict";
const build = async (model, context) => {
    const { pageName, title, description, keywords } = model;
    const log = context.logger.start(`services:metaservice:build${model}`);
    const searchTopic = await new db.metaservice({
        pageName,
        title,
        description,
        keywords,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return searchTopic;
};

const setAlert = async (model, metaservice, context) => {
    const log = context.logger.start("services:metaservice:set");
    if (model.pageName !== "string" && model.pageName !== undefined) {
        metaservice.pageName = model.pageName;
    }
    if (model.title !== "string" && model.title !== undefined) {
        metaservice.title = model.title;
    }
    if (model.description !== "string" && model.description !== undefined) {
        metaservice.description = model.description;
    }
    if (model.keywords !== "string" && model.keywords !== undefined) {
        metaservice.keywords = model.keywords;
    }
    log.end();
    await metaservice.save();
    return metaservice;
}

const create = async (model, context) => {
    const log = context.logger.start("services:metaservice:create");
    const ismetaserviceExist = await db.metaservice.findOne({ pageName: { $eq: model.pageName } });
    if (ismetaserviceExist) {
        throw new Error("metaservice is already exist");
    }
    const metaservice = build(model, context);
    log.end();
    return metaservice;
};

const getAllmetaservice = async (context) => {
    const log = context.logger.start(`services:metaservice:getAllmetaservice`);
    const metaservices = await db.metaservice.find({})
    log.end();
    return metaservices;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:metaservice:update`);
    if (!id) {
        throw new Error("meta service id is required");
    }

    let entity = await db.metaservice.findOne({ _id: id });
    if (!entity) {
        throw new Error("invalid meta service");
    }
    const metaservice = await setAlert(model, entity, context);
    log.end();
    return metaservice
};

const deleteMetaservice = async (id, context) => {
    const log = context.logger.start(`services:metaservice:deleteMetaservice:${id}`);
    if (!id) {
        throw new Error("meta service id is required");
    }
    await db.metaservice.deleteOne({ _id: id });
    log.end();
    return 'meta service Deleted Successfully'
};

exports.create = create;
exports.getAllmetaservice = getAllmetaservice;
exports.update = update;
exports.deleteMetaservice = deleteMetaservice;