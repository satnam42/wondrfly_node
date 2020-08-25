

"use strict";

const build = async (model, context) => {
    const { userId, programId } = model;
    const log = context.logger.start(`services:favourites:build${model}`);
    const favourite = await new db.favourite({
        user: userId,
        program: programId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return favourite;
};

const create = async (model, context) => {
    const log = context.logger.start("services:favourites:create");
    const Favourites = await db.favourite.find({ $and: [{ user: model.userId }, { program: model.programId }] })
    if (Favourites.length > 0) {
        return "favourite already exist";
    }
    const favourite = build(model, context);
    log.end();
    return favourite;
};

const getAllfavourites = async (context) => {
    const log = context.logger.start(`services:favourites:getAllfavourites`);
    const Favourites = await db.favourite.find({}).populate('program');
    if (Favourites.length < 0) {
        throw new Error("Favourites not found");
    }
    log.end();
    return Favourites;
};

const getFavouritesByUserId = async (query, context) => {
    const log = context.logger.start(`services:favourites:getFavouritesByParentId`);
    if (!query.parentId) {
        throw new Error("userId not found");
    }
    const favourites = await db.favourite.find({ user: query.parentId }).populate('program');
    if (favourites.length < 0) {
        throw new Error("Favourites not found");
    }
    log.end();
    return favourites;
};

const removeById = async (id, context) => {
    const log = context.logger.start(`services:favourites:removeById`);

    if (!id) {
        throw new Error("favourite id not found");
    }

    let isDeleted = await db.favourite.deleteOne({ _id: id })

    if (!isDeleted) {
        throw new Error("something went wrong");
    }

    log.end();
    return 'favourite removed succesfully'
};

exports.create = create;
exports.getAllfavourites = getAllfavourites;
exports.removeById = removeById
exports.getFavouritesByUserId = getFavouritesByUserId