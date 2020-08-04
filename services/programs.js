
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
        isPaid: model.isPaid,
        pricePerParticipant: model.pricePerParticipant,
        priceForSiblings: model.priceForSiblings,
        specialInstructions: model.specialInstructions,
        adultAssistanceIsRequried: model.adultAssistanceIsRequried,
        capacity: model.capacity,
        emails: model.emails,
        batches: model.batches,
        user: model.userId,
        addresses: model.addresses,
        category: model.categoryId,
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
    if (model.isPaid !== "string" && model.isPaid !== undefined) {
        program.isPaid = model.isPaid;
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
    if (model.emails.lenght > 1) {
        program.emails = model.emails;
    }
    if (model.batches.lenght > 1) {
        program.batches = model.batches;
    }
    if (model.addresses.lenght > 1) {
        program.addresses = model.addresses;
    }
    if (model.category !== "string" && model.category !== undefined) {
        program.category = model.category;
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
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let programs = await db.program.find().populate('category').skip(skipCount).limit(pageSize);
    programs.count = await db.program.find().count();
    log.end();
    return programs;
};

const getById = async (id, context) => {
    const log = context.logger.start(`services:programs:getById`);
    if (!id) {
        throw new Error("id not found");
    }
    let program = await db.program.findById(id);
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
    let isProgram = await db.program.findById(id);

    if (!isProgram) {
        throw new Error("program Not found");
    }

    const program = await set(model, isprogram, context);

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
    ).populate('category').limit(5);
    log.end();
    return program;
};

const getProgramsByPpovider = async (query, context) => {
    const log = context.logger.start(`services:programs:getAllprograms`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    if (query.userId) {
        throw new Error("userId is  required");
    }
    let programs = await db.program.find({ user: query.userId }).populate('category').skip(skipCount).limit(pageSize);
    programs.count = await db.program.find({ user: query.userId }).count();
    log.end();
    return programs;
};

const increaseViewCount = async (model, context) => {
    const log = context.logger.start("services:programs:increaseViewCount");
    let view
    if (!model.programId) {
        throw new Error("program id is requried");
    }
    view = await db.view.findOne({ $and: [{ user: context.user.id, }, { program: model.programId }] })
    if (view) {
        view.count = model.count += view.count
        await view.save()
    }
    else {
        view = await new db.view({
            count: model.count,
            program: model.programId,
            user: context.user.id,
            createdOn: new Date(),
            updateOn: new Date(),
        }).save();
    }

    log.end();
    return view;
};

const increaseClickCount = async (model, context) => {
    const log = context.logger.start("services:programs:increaseClickCount");
    let click
    if (!model.programId) {
        throw new Error("program id is requried");
    }

    click = await db.click.findOne({ $and: [{ user: context.user.id, }, { program: programId }] })

    if (click) {
        click.count = model.count = +  click.count
        await click.save()
    }
    else {
        click = await new db.click({
            count: model.count,
            program: model.programId,
            user: context.user.id,
            createdOn: new Date(),
            updateOn: new Date(),
        }).save();
    }

    log.end();
    return click;
};
const getViewCount = async (query, context) => {
    const log = context.logger.start(`services:programs:getViewCount`);
    if (!query.userId) {
        throw new Error("userId not found");
    }
    const viewCount = await db.view.aggregate([
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
    return viewCount[0];
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
exports.create = create;
exports.getAllprograms = getAllprograms;
exports.update = update;
exports.getById = getById;
exports.removeById = removeById;
exports.uploadTimeLinePics = uploadTimeLinePics;
exports.search = search;
exports.getProgramsByPpovider = getProgramsByPpovider
exports.increaseViewCount = increaseViewCount
exports.increaseClickCount = increaseClickCount
exports.getViewCount = getViewCount
exports.getProgramCount = getProgramCount