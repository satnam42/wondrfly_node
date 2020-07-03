

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

// const set = (model, program, context) => {
//     const log = context.logger.start("services:programs:set");
//     if (model.name !== "string" && model.name !== undefined) {
//         program.name = model.name;
//     }
//     if (model.description !== "string" && model.description !== undefined) {
//         program.description = model.description;
//     }
//     program.updateOn = new Date()
//     log.end();
//     program.save();
//     return program;
// };

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

const getAllprograms = async (context) => {
    const log = context.logger.start(`services:programs:getAllprograms`);
    const programs = await db.program.find();
    log.end();
    return programs;
};

// const update = async (id, model, context) => {
//     const log = context.logger.start(`services:programs:update`);
//     let isprogram = await db.program.findById(id);
//     if (!isprogram) {
//         throw new Error("program Not found");
//     }
//     const program = await set(model, isprogram, context);
//     log.end();
//     return program
// };


// const search = async (query, context) => {
//     const log = context.logger.start(`services:programs:search`);
//     const program = await db.program.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
//     ).limit(5);
//     log.end();
//     return program;
// };

exports.create = create;
exports.getAllprograms = getAllprograms;
// exports.update = update;
// exports.search = search;