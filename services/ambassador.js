const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;
const accountSid = 'AC5d73ce4cfa70158e5357a905e379af2b';
var nodemailer = require('nodemailer')
let path = require('path');
const fs = require('fs');
// Your Account SID from www.twilio.com/console
const authToken = 'd864b1037de18df6150de9b4bf97b200'
// d864b1037de18df6150de9b4bf97b200;   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
const crypto = require("crypto");


const build = async (model, context, nmbr) => {
    const log = context.logger.start(`services:ambassador:build${model}`);
    const point = await new db.rewardpoint({
        ambassador: model.userId,
        basicPoints: nmbr,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return point;
};

const addOrRemove = async (model, context) => {
    const log = context.logger.start("services:ambassador:addOrRemove");
    let user = await db.user.findById(model.userId);

    let point
    if (user) {
        if (model.isAmbassador === true) {
            let nmbr = 10
            point = await build(model, context, nmbr);
        }
        if (model.isAmbassador === false) {
            let nmbr = 0
            point = await build(model, context, nmbr);
        }
    }

    await db.user.findByIdAndUpdate(model.userId, {
        $set: {
            isAmbassador: model.isAmbassador,
        }
    })

    if (point) {
        await db.user.update(
            { _id: model.userId },
            { $push: { rewardpointIds: point._id } },
        );
    }

    log.end();
    return point;
};

const getAmbassadors = async (id, context) => {

    const log = context.logger.start('services:ambassador:getAmbassadors');
    const user = await db.user.find({ isAmbassador: "true" }).populate('rewardpointIds');
    log.end();
    return user;
};


const addActivities = async (model, context) => {
    const log = context.logger.start("services:tags:addActivities");
    const isactiviyExist = await db.pointactivities.findOne({ activity: { $eq: model.activity } });
    if (isactiviyExist) {
        return "activity already exist";
    }

    const activity = await new db.pointactivities({
        activity: model.activity,
        point: model.point,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return activity;
};


const getActivities = async (model, context) => {
    const log = context.logger.start('services:ambassador:getActivities');
    const activities = await db.pointactivities.find();
    log.end();
    return activities;
};

exports.getAmbassadors = getAmbassadors;
exports.addOrRemove = addOrRemove;
exports.addActivities = addActivities;
exports.getActivities = getActivities