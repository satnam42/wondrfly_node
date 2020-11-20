"use strict";
const build = async (model, context) => {
    const log = context.logger.start(`services:likes:build${model}`);
    const like = await new db.like({
        creator: model.userId,
        post: model.postId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return like;
};

// const like = async (model, context) => {
//     const log = context.logger.start("services:likes:createPost");
//     let post = await db.post.findById(model.postId);
//     post.likesCount += 1
//     await post.save()
//     const like = build(model, context);
//     log.end();
//     return like;
// };
const like = async (model, context) => {
    const log = context.logger.start("services:likes:createPost");
    let post = await db.post.findById(model.postId);
    let islike = await db.like.findOne({ creator: model.userId, post: model.postId });
    let like
    if (!islike) {
        post.likesCount += 1
        await post.save();
        like = build(model, context);
    } else {
        await db.like.findOneAndDelete({ creator: model.userId, post: model.postId }, function (err, docs) {
            console.log('err', err);
        });
        post.likesCount -= 1
        await post.save();
    }


    log.end();
    return like;
};

// if (comment) {
//     await db.post.update(
//         { _id: model.postId },
//         { $push: { likesByUser: model.userId } },
//     );
// }
// else {
//     throw new Error("error in adding comment");
// }

const UnLike = async (query, context) => {
    const log = context.logger.start(`services:likes:update`);
    if (query.postId) {
        throw new Error("post Id  is requried ");
    }
    if (query.userId) {
        throw new Error("user id is requried ");
    }
    let likeDetail = await db.like.find({ post: query.postId, creator: userId });
    let post = await db.post.findById(likeDetail.post);
    if (post.likesCount >= 0) {
        post.likesCount - 1
        await post.save()
    }
    await db.like.deleteOne({ _id: likeDetail.id })
    likeDetail = null
    likeDetail = await db.like.find({ post: query.postId, creator: userId });

    if (likeDetail) {
        let post = await db.post.findById(query.postId);
        post.likesCount += 1
        await post.save()
        throw new Error("something went wrong");
    }
    log.end();
    return 'unlike  succesfully'
};

exports.like = like;
exports.UnLike = UnLike;