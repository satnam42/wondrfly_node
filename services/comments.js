"use strict";
const build = async (model, context) => {
    const log = context.logger.start(`services:comments:build${model}`);
    const comment = await new db.comment({
        creator: model.creator,
        creatorName: model.creatorName,
        text: model.text,
        postId: model.postId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return comment;
};
const set = (model, comment, context) => {
    const log = context.logger.start("services:comments:set");

    if (model.text !== "string" && model.text !== undefined) {
        comment.text = model.text;
    }
    comment.updateOn = new Date()
    log.end();
    comment.save();
    return comment;
};
const createComment = async (model, context) => {
    const log = context.logger.start("services:comments:createPost");
    const comment = build(model, context);
    log.end();
    return comment;
};
const update = async (id, model, context) => {
    const log = context.logger.start(`services:comments:update`);
    if (id) {
        throw new Error("comment id is requried found");
    }
    let commentDetail = await db.comment.findById(id);
    if (!commentDetail) {
        throw new Error("comment not found");
    }
    const comment = await set(model, commentDetail, context);
    log.end();
    return comment
};
const removeComment = async (id, model, context) => {
    const log = context.logger.start(`services:comments:update`);
    if (id) {
        throw new Error("comment id is requried found");
    }
    await db.comment.deleteOne({ _id: id })
    let commentDetail = await db.comment.findById(id);
    if (commentDetail) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'comment deleted succesfully'
};

exports.createComment = createComment;
exports.update = update;
exports.removeComment = removeComment;