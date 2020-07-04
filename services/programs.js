

"use strict";
const build = async (model, context) => {
    model;
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
        pricePerParticipant: model.priceForSiblings,
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
    let programs = await db.program.find().skip(skipCount).limit(pageSize);
    programs.count = await db.program.find().count();
    log.end();
    return programs;
};
const getById = async (id, context) => {
    if (!id) {
        throw new Error("id not found");
    }
    const log = context.logger.start(`services:programs:update`);
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
    let isProgram = await db.program.findById(id);
    if (!isProgram) {
        throw new Error("program Not found");
    }
    const program = await set(model, isprogram, context);
    log.end();
    return program
};


// const search = async (query, context) => {
//     const log = context.logger.start(`services:programs:search`);
//     const program = await db.program.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
//     ).limit(5);
//     log.end();
//     return program;
// };

exports.create = create;
exports.getAllprograms = getAllprograms;
exports.update = update;
exports.getById = getById;
// exports.search = search;