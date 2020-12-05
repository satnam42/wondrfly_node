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
const pointBuild = async (model, context, nmbr, description) => {
    const log = context.logger.start(`services:ambassador:build${model}`);
    const point = await new db.rewardpoint({
        ambassador: model.userId,
        // likePoints: nmbr,
        description: description,
        activityPoints: nmbr,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return point;
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
    let user = await db.user.findById(model.userId);

    let like
    if (!islike) {
        let nmbr = 20;
        let description = 'post like'
        post.likesCount += 1
        await post.save();
        like = build(model, context);
        let point = await pointBuild(model, context, nmbr, description);

        if (point) {
            await db.user.findByIdAndUpdate(model.userId, {
                $set: {
                    totalPoints: user.totalPoints += 20
                }
            })
            await db.user.update(
                { _id: model.userId },
                { $push: { rewardpointIds: point._id } },
            );
        }

    } else {
        await db.like.findOneAndDelete({ creator: model.userId, post: model.postId }, function (err, docs) {
            console.log('err', err);
        });
        post.likesCount -= 1
        await post.save();
        let nmbr = 0;
        let description = 'post unlike'
        await pointBuild(model, context, nmbr, description);
        await db.user.findByIdAndUpdate(model.userId, {
            $set: {
                totalPoints: user.totalPoints -= 20
            }
        })
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