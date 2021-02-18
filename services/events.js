
"use strict";
const build = async (model, context) => {
    const { title, description, userId, date } = model;
    const log = context.logger.start(`services:event:build${model}`);
    const event = await new db.event({
        title: title,
        description: description,
        date: date,
        user: userId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return event;
};
const set = (model, event, context) => {
    const log = context.logger.start("services:events:set");
    if (model.title !== "string" && model.title !== undefined && model.title !== '') {
        event.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined && model.description !== '') {
        event.description = model.description;
    }
    if (model.date !== "string" && model.date !== undefined && model.date !== '') {
        event.date = model.date;
    }
    event.updatedOn = new Date();
    log.end();
    event.save();
    return event;
};


const create = async (model, context) => {
    const log = context.logger.start("services:events:create");
    const event = build(model, context);
    log.end();
    return event;
};

const eventsByUserId = async (id, context) => {
    const log = context.logger.start(`services:events:eventsByUserId`);
    if (!id) throw new Error('userId is required')
    const events = await db.event.find({ user: id }).populate('user', 'firstName');
    log.end();
    return events;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:events:update`);
    if (!id) throw new Error("event id is required");
    let event = await db.event.findById(id);
    if (!event) throw new Error("event not found");
    event = await set(model, event, context);
    log.end();
    return event
};

exports.create = create
exports.eventsByUserId = eventsByUserId
exports.update = update