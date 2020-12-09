"use strict";
const build = async (user, model, context) => {
    const log = context.logger.start(`services:comments:build${model}`);
    const comment = await new db.comment({
        creator: model.creator,
        creatorName: model.creatorName,
        text: model.text,
        userRole: user.role,
        userImage: user.avatarImages,
        userCreatedOn: user.createdOn,
        postId: model.postId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return comment;
};

const pointBuild = async (model, context, nmbr, description) => {
    const log = context.logger.start(`services:ambassador:build${model}`);
    const point = await new db.rewardpoint({
        ambassador: model.creator,
        // commentPoints: nmbr,
        description: description,
        activityPoints: nmbr,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return point;
};

const set = (model, comment, context) => {
    const log = context.logger.start("services:comments:set");

    if (model.text !== "string" && model.text !== undefined) {
        comment.text = model.text;
    }
    comment.updatedOn = new Date();
    log.end();
    comment.save();
    return comment;
};
const createComment = async (model, context) => {
    const log = context.logger.start("services:comments:createPost");
    let user = await db.user.findById(model.creator);
    const comment = await build(user, model, context);
    // const post = await db.post.findById(model.postId);
    if (comment) {
        let nmbr = 20;
        let description = 'comment point';
        await db.post.update(
            { _id: model.postId },
            { $push: { comments: comment._id } },
        );
        let point = await pointBuild(model, context, nmbr, description);
        if (point) {
            await db.user.findByIdAndUpdate(model.creator, {
                $set: {
                    totalPoints: user.totalPoints += 20
                }
            })
            await db.user.update(
                { _id: model.creator },
                { $push: { rewardpointIds: point._id } },
            );
        }

    }
    else {
        throw new Error("error in adding comment");
    }
    log.end();
    return comment;
};
const update = async (id, model, context) => {
    const log = context.logger.start(`services:comments:update`);
    if (!id) {
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
    if (!id) {
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


const getById = async (id, context) => {
    const log = context.logger.start(`services:users:getById:${id}`);
    const user = await db.comment.findById(id);
    log.end();
    return user;
};


exports.createComment = createComment;
exports.update = update;
exports.removeComment = removeComment;
exports.getById = getById;