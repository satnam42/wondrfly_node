"use strict";
const build = async (model, context) => {
    const log = context.logger.start(`services:likes:build${model}`);
    const like = await new db.like({
        creator: model.userId,
        likeBy: model.userName,
        post: model.postId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return like;
};

const like = async (model, context) => {
    const log = context.logger.start("services:likes:createPost");
    let post = await db.post.findById(model.postId);
    post.like += 1
    await post.save()
    const like = build(model, context);
    log.end();
    return like;
};

const UnLike = async (id, model, context) => {
    const log = context.logger.start(`services:likes:update`);
    if (id) {
        throw new Error("like id is requried found");
    }
    let likeDetail = await db.like.findById(id);
    let post = await db.post.findById(likeDetail.post);
    likeDetail = null
    post.like - 1
    await post.save()
    await db.like.deleteOne({ _id: id })
    likeDetail = await db.like.findById(id);
    if (likeDetail) {
        let post = await db.post.findById(likeDetail.post);
        post.like - 1
        await post.save()
        throw new Error("something went wrong");
    }
    log.end();
    return 'unlike  succesfully'
};

exports.like = like;
exports.UnLike = UnLike;