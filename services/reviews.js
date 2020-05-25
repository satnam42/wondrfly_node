"use strict";
const build = async (model, context) => {
    // const { userId, programId, rating, review } = model;
    const log = context.logger.start(`services:reviews:build${model}`);
    const review = await new db.review({
        user: model.userId,
        program: model.programId,
        rating: model.rating,
        review: model.review,
        postedOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return review;
};
const set = (model, review, context) => {
    const log = context.logger.start("services:reviews:set");
    if (model.rating !== "string" && model.rating !== undefined) {
        review.rating = model.rating;
    }
    if (model.review !== "string" && model.review !== undefined) {
        review.review = model.review;
    }
    review.updateOn = new Date()
    log.end();
    review.save();
    return review;
};
const create = async (model, context) => {
    const log = context.logger.start("services:reviews:create");
    const isReviewExist = await db.review.findOne({ $and: [{ user: { $eq: model.userId } }, { program: { $eq: model.programId } }] });
    if (isReviewExist) {
        return "Sorry, you can only add one review per program";
    }
    const review = build(model, context);
    log.end();
    return review;
};

const reviewsByProgramId = async (query, context) => {
    const log = context.logger.start(`services:reviews:getAllreviews`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let reviews = await db.review
        .find({ program: { $eq: query.programId } })
        .skip(skipCount)
        .limit(pageSize);
    reviews.count = await db.review.find({ program: { $eq: model.programId } }).count();
    log.end();
    return reviews;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:reviews:update`);
    const review = await db.review.findById(id);
    if (!review) {
        throw new Error("Review not found!");
    }
    const updatedReview = await set(model, review, context);
    log.end();
    return updatedReview
};

exports.create = create;
exports.reviewsByProgramId = reviewsByProgramId;
exports.update = update;