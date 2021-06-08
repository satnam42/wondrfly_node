"use strict";

const build = async (model, context) => {
    const log = context.logger.start(`services:feedback:build${model}`);
    const feedback = await new db.feedback({
        user: model.id,
        feedback: model.feedback,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return feedback;
};

const create = async (model, context) => {
    const log = context.logger.start("services:feedback:create");

    let user = await db.user.findById(model.id);
    if (!user) {
        throw new Error("user not found");
    }
    const feedback = build(model, context);
    log.end();
    return feedback;
};

const getAllfeedback = async (context) => {
    const log = context.logger.start(`services:feedback:getAllfeedback`);
    const feedbacks = await db.feedback.find();
    log.end();
    return feedbacks;
};


exports.create = create;
exports.getAllfeedback = getAllfeedback;