
"use strict";
const ObjectId = require("mongodb").ObjectID;
const build = async (model, context) => {
    const log = context.logger.start(`services:programs:build${model}`);

    const program = await new db.program({
        name: model.name,
        description: model.description,
        type: model.type,
        price: model.price,
        code: model.code,
        location: model.location,
        ageGroup: model.ageGroup,
        date: model.date,
        time: model.time,
        bookingCancelledIn: model.bookingCancelledIn,
        duration: model.duration,
        isFree: model.isFree,
        pricePerParticipant: model.pricePerParticipant,
        priceForSiblings: model.priceForSiblings,
        specialInstructions: model.specialInstructions,
        adultAssistanceIsRequried: model.adultAssistanceIsRequried,
        capacity: model.capacity,
        emails: model.emails,
        batches: model.batches,
        status: model.status || 'active',
        user: model.userId,
        addresses: model.addresses,
        tags: model.tags,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();

    log.end();

    return program;
};
const buildTimelineUrl = async (files) => {

    let bannerImages = []
    let bannerUrl = ''
    await files.forEach(file => {
        bannerUrl = imageUrl + 'assets/images/' + file.filename
        bannerImages.push(bannerUrl)
    });
    return bannerImages
}
const set = (model, program, context) => {
    const log = context.logger.start("services:programs:set");
    if (model.name !== "string" && model.name !== undefined) {
        program.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined) {
        program.description = model.description;
    }
    if (model.type !== "string" && model.type !== undefined) {
        program.type = model.type;
    }
    if (model.price !== "string" && model.price !== undefined) {
        program.price = model.price;
    }
    if (model.code !== "string" && model.code !== undefined) {
        program.code = model.code;
    }
    if (model.location !== "string" && model.location !== undefined) {
        program.location = model.location;
    }
    if (model.ageGroup.from !== "string" && model.ageGroup.to !== "string" && model.ageGroup.to !== undefined && model.ageGroup.from) {
        program.ageGroup = model.ageGroup;
    }
    if (model.date.from !== "string" && model.date.to !== "string" && model.date.from !== undefined && model.date.to !== undefined) {
        program.date = model.date;
    }
    if (model.time.from !== "string" && model.time.to !== "string" && model.time.to !== undefined && model.time.from !== undefined) {
        program.time = model.time;
    }
    if (model.bookingCancelledIn !== "string" && model.bookingCancelledIn !== undefined) {
        program.bookingCancelledIn = model.bookingCancelledIn;
    }
    if (model.duration !== "string" && model.duration !== undefined) {
        program.duration = model.duration;
    }
    if (model.isFree !== "string" && model.isFree !== undefined) {
        program.isFree = model.isFree;
    }
    if (model.pricePerParticipant !== "string" && model.pricePerParticipant !== undefined) {
        program.pricePerParticipant = model.pricePerParticipant;
    }
    if (model.priceForSiblings !== "string" && model.priceForSiblings !== undefined) {
        program.priceForSiblings = model.priceForSiblings;
    }

    if (model.specialInstructions !== "string" && model.specialInstructions !== undefined) {
        program.specialInstructions = model.specialInstructions;
    }
    if (model.adultAssistanceIsRequried !== "string" && model.adultAssistanceIsRequried !== undefined) {
        program.adultAssistanceIsRequried = model.adultAssistanceIsRequried;
    }
    if (model.capacity !== "string" && model.capacity !== undefined) {
        program.capacity = model.capacity;
    }
    if (model.emails.lenght > count) {
        program.emails = model.emails;
    }
    if (model.batches.lenght > count) {
        program.batches = model.batches;
    }
    if (model.addresses.lenght > count) {
        program.addresses = model.addresses;
    }
    if (model.tags.lenght > count) {
        program.tags = model.tags;
    }
    program.updateOn = new Date()
    log.end();
    program.save();
    return program;

};
const create = async (model, context) => {
    const log = context.logger.start("services:programs:create");
    if (context.user.role == 'parent') {
        throw new Error("you are not authorized to perform this operation");
    }
    // const isprogramExist = await db.program.findOne({ name: { $eq: model.name } });
    // if (isprogramExist) {
    //     return "program already exist";
    // }
    const program = build(model, context);
    log.end();
    return program;

};
const getAllprograms = async (query, context) => {
    const log = context.logger.start(`services:programs:getAllprograms`);
    let pageNo = Number(query.pageNo) || count;
    let pageSize = Number(query.pageSize) || count0;
    let skipCount = pageSize * (pageNo - count);
    let programs = await db.program.find().populate('tags').skip(skipCount).limit(pageSize);
    programs.count = await db.program.find().count();
    log.end();
    return programs;
};
const getById = async (id, context) => {
    const log = context.logger.start(`services:programs:getById`);
    if (!id) {
        throw new Error("id not found");
    }
    let program = await db.program.findById(id).populate('tags');
    if (!program) {
        throw new Error("program not found");
    }
    log.end();
    return program

};
const update = async (id, model, context) => {
    const log = context.logger.start(`services:programs:update`);
    if (!id) {
        throw new Error("id Not found");
    }
    if (context.user.role == 'parent') {
        throw new Error("you are not authorized to perform this operation");
    }
    let programDetail = await db.program.findById(id);

    if (!programDetail) {
        throw new Error("program Not found");
    }

    const program = await set(model, programDetail, context);

    log.end();
    return program
};
const removeById = async (id, model, context) => {
    const log = context.logger.start(`services:programs:removeById`);
    if (!id) {
        throw new Error("programs id not found");
    }
    let isDeleted = await db.program.deleteOne({ _id: id })
    if (!isDeleted) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'program deleted succesfully'
};
const uploadTimeLinePics = async (id, files, context) => {
    const log = context.logger.start(`services:programs:uploadTimeLinePics`);
    const program = await db.program.findOne({ _id: id });

    if (files.length < 0) {
        throw new Error("image not found");
    }

    if (!program) {
        throw new Error("program not found");
    }

    let pics = await buildTimelineUrl(files)
    program.timelinePics = pics
    await program.save();
    log.end();
    return program

};
const search = async (query, context) => {
    const log = context.logger.start(`services:programs:search`);
    const program = await db.program.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).populate('tags').limit(5);
    log.end();
    return program;
};
const getProgramsByProvider = async (query, context) => {
    const log = context.logger.start(`services:programs:getAllprograms`);
    let pageNo = Number(query.pageNo) || count;
    let pageSize = Number(query.pageSize) || count0;
    let skipCount = pageSize * (pageNo - count);
    if (!query.userId) {
        throw new Error("userId is  required");
    }
    let programs = await db.program.find({ user: query.userId }).populate('tags').skip(skipCount).limit(pageSize);
    programs.count = await db.program.find({ user: query.userId }).count();
    log.end();
    return programs;
};
const addProgramAction = async (model, context) => {
    const log = context.logger.start("services:programs:increaseViewCount");
    let programActionCounter
    if (!model.programId) {
        throw new Error("program id is requried");
    }
    programActionCounter = await db.programActionCounter.findOne({ $and: [{ user: context.user.id, }, { program: model.programId }] })
    let count = 1
    if (model.action == 'view') {
        if (programActionCounter != null & programActionCounter != undefined) {
            programActionCounter.view = count += programActionCounter.view
            await programActionCounter.save()
        }
        else {
            programActionCounter = await new db.programActionCounter({
                view: count,
                program: model.programId,
                user: context.user.id,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
        }
    }
    else if (model.action == 'click') {
        if (programActionCounter != null && programActionCounter != undefined) {
            programActionCounter.click = count += programActionCounter.click
            await programActionCounter.save()
        }
        else {
            programActionCounter = await new db.programActionCounter({
                click: count,
                program: model.programId,
                user: context.user.id,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
        }

    }
    else if (model.action == 'favourite') {
        if (programActionCounter != null && programActionCounter != undefined) {
            programActionCounter.favourite = count += programActionCounter.favourite
            await programActionCounter.save()
        }
        else {
            click = await new db.programActionCounter({
                favourite: count,
                program: model.programId,
                user: context.user.id,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
        }

    }
    log.end();
    return programActionCounter;
};
const getViewCount = async (query, context) => {
    const log = context.logger.start(`services:programs:getViewCount`);
    if (!query.userId) {
        throw new Error("userId not found");
    }
    const viewCount = await db.programActionCounter.aggregate([
        {
            $lookup: {
                from: "programs",
                localField: "program",
                foreignField: "_id",
                as: "program"

            }
        },
        {
            $match: {
                "program.user": ObjectId(query.userId)
            },
        },

        { $group: { _id: null, count: { $sum: "$count" } } }
    ])

    log.end();
    return viewCount;
};
const getProgramCount = async (query, context) => {
    const log = context.logger.start(`services:programs:getProgramCount`);
    if (!query.userId) {
        throw new Error("userId is requried");
    }
    const count = await db.program.find({ $and: [{ user: query.userId }, { status: 'active' }] }).count();
    log.end();
    return count;
};
const setActiveOrDecactive = async (query, context) => {
    const log = context.logger.start(`services:programs:getProgramCount`);
    if (!query.id) {
        throw new Error("program id is requried");
    }
    if (!query.status) {
        throw new Error("program status is requried");
    }
    let program = await db.program.findById(query.id)
    program.status = query.status
    await program.save()
    log.end();
    return program;
};
const getGraphData = async (query, context) => {
    const log = context.logger.start(`services:programs:getGraphData`);
    if (!query.id) {
        throw new Error("userId is requried");
    }
    const programActions = await db.programActionCounter.aggregate([
        {
            $lookup: {
                from: "programs",
                localField: "program",
                foreignField: "_id",
                as: "program"
            }
        },
        {
            $match: {
                "program.user": ObjectId(query.id)
            },
        },
        {
            $group: {
                _id: "$program.name",
                view: { $sum: "$view" },
                click: { $sum: "$click" },
                favourite: { $sum: "$favourite" }
            }
        },
        {
            $sort: {
                _id: -1
            }
        }
    ]).limit(5);


    let model = {
        lables: [],
        views: [],
        clicks: [],
        favourites: [],
    }
    programActions.forEach(programAction => {
        model.lables.push(programAction._id[0])
        model.views.push(programAction.view)
        model.clicks.push(programAction.click)
        model.favourites.push(programAction.favourite)
    });
    log.end();
    return model;
};
exports.create = create;
exports.getAllprograms = getAllprograms;
exports.update = update;
exports.getById = getById;
exports.removeById = removeById;
exports.uploadTimeLinePics = uploadTimeLinePics;
exports.search = search;
exports.getProgramsByProvider = getProgramsByProvider
exports.addProgramAction = addProgramAction
exports.getViewCount = getViewCount
exports.getProgramCount = getProgramCount
exports.setActiveOrDecactive = setActiveOrDecactive
exports.getGraphData = getGraphData