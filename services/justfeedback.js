"use strict";
const build = async (model, context) => {
    const log = context.logger.start(`services:justfeedback:build${model}`);
    const feedback = await new db.justfeedback({
        user: model.userId,
        // feedback: model.feedback,
        name: model.name,
        description: model.description,
        url: model.url,
        startDate: model.startDate,
        endDate: model.endDate,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return feedback;
};

const setFeedback = async (model, feedback, context) => {
    const log = context.logger.start("services:justfeedback:set");
    if (model.name !== "string" && model.name !== undefined) {
        feedback.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined) {
        feedback.description = model.description;
    }
    if (model.startDate !== "string" && model.startDate !== undefined) {
        feedback.startDate = model.startDate;
    }
    if (model.endDate !== "string" && model.endDate !== undefined) {
        feedback.endDate = model.endDate;
    }
    if (model.url !== "string" && model.url !== undefined) {
        feedback.url = model.url;
    }
    log.end();
    await feedback.save();
    return feedback;
}

const create = async (model, context) => {
    const log = context.logger.start("services:justfeedback:create");

    let user = await db.user.findById(model.userId);
    if (!user) {
        throw new Error("user not found");
    }
    const feedback = build(model, context);
    log.end();
    return feedback;
};

const update = async (model, context) => {
    const log = context.logger.start(`services:justfeedback:update`);
    if (!model.id) {
        throw new Error("feedback id is required");
    }

    let entity = await db.justfeedback.findOne({ _id: model.id });
    if (!entity) {
        throw new Error("invalid feedback");
    }
    const feedback = await setFeedback(model, entity, context);
    log.end();
    return feedback
};

const getAllfeedback = async (context) => {
    const log = context.logger.start(`services:justfeedback:getAllfeedback`);
    const feedbacks = await db.justfeedback.find().populate('user').sort({ _id: -1 });
    log.end();
    return feedbacks;
};

const deleteFeedback = async (id, context) => {
    const log = context.logger.start(`services:justfeedback:deleteFeedback:${id}`);
    if (!id) {
        throw new Error("feedback id is required");
    }
    await db.justfeedback.deleteOne({ _id: id });
    log.end();
    return 'feedback Deleted Successfully'
};


exports.create = create;
exports.getAllfeedback = getAllfeedback;
exports.deleteFeedback = deleteFeedback;
exports.update = update;