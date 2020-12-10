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
const { BalanceInstance } = require("twilio/lib/rest/api/v2010/account/balance");


const build = async (model, context, nmbr, description) => {
    const log = context.logger.start(`services:ambassador:build${model}`);
    const point = await new db.rewardpoint({
        ambassador: model.userId,
        activityPoints: nmbr,
        description: description,
        // totalPoints: balance,
        isAmbassadorOn: new Date(),
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return point;
};

const setActivity = async (model, activitys, context) => {
    const log = context.logger.start("services:alert:set");
    if (model.activity !== "string" && model.activity !== undefined) {
        activitys.activity = model.activity;
    }
    if (model.point !== "string" && model.point !== undefined) {
        activitys.point = model.point;
    }

    log.end();
    await activitys.save();
    return activitys;
}

const addOrRemove = async (model, context) => {
    const log = context.logger.start("services:ambassador:addOrRemove");
    let user = await db.user.findById(model.userId);

    let point;
    // let totalBlance = post.likesCount += 1

    if (user) {
        if (model.isAmbassador === true) {
            let nmbr = 10;
            let description = 'Added As Ambassador';
            point = await build(model, context, nmbr, description);
            await db.user.findByIdAndUpdate(model.userId, {
                $set: {
                    isAmbassador: model.isAmbassador,
                    totalPoints: user.totalPoints += 10
                }
            })
        }
        if (model.isAmbassador === false) {
            let nmbr = -10
            let description = 'Removed Ambassdor';
            point = await build(model, context, nmbr, description);
            await db.user.findByIdAndUpdate(model.userId, {
                $set: {
                    isAmbassador: model.isAmbassador,
                    totalPoints: user.totalPoints -= 10
                }
            })
        }
    }



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
        throw new Error("activity is already exist");
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

const addActivityPoint = async (model, context) => {
    const log = context.logger.start("services:tags:addActivityPoint");
    let user = await db.user.findById(model.ambassadorId);
    const isactiviyExist = await db.rewardpoint.findOne({ activity: { $eq: model.activity } });
    // if (isactiviyExist) {
    //     throw new Error("activity point is already exist");
    // }
    const activityPoint = await new db.rewardpoint({
        ambassador: model.ambassadorId,
        activity: model.activity,
        description: model.description,
        activityPoints: model.point,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    if (activityPoint) {
        if (model.point > 0) {
            await db.user.findByIdAndUpdate(model.ambassadorId, {
                $set: {
                    totalPoints: user.totalPoints += model.point
                }
            })
        }

        if (model.point < 0) {
            let value = Math.abs(model.point)
            await db.user.findByIdAndUpdate(model.ambassadorId, {
                $set: {
                    totalPoints: user.totalPoints -= value
                }
            })
        }

        await db.user.update(
            { _id: model.ambassadorId },
            { $push: { rewardpointIds: activityPoint._id } },
        );
    }
    log.end();
    return activityPoint;
};

const deleteActivity = async (id, context) => {
    const log = context.logger.start(`services:ambassador:deleteActivity:${id}`);
    if (!id) {
        throw new Error("activity id is required");
    }

    await db.pointactivities.deleteOne({ _id: id });
    log.end();
    return 'Alert Deleted Successfully'
};

const updateActivity = async (id, model, context) => {
    const log = context.logger.start(`services:ambassador:updateActivity`);
    if (!id) {
        throw new Error("activity id is required");
    }
    let activity = await db.pointactivities.findById(id);
    if (!activity) {
        throw new Error("invalid activity");
    }
    const activitys = await setActivity(model, activity, context);
    log.end();
    return activitys

};

exports.getAmbassadors = getAmbassadors;
exports.addOrRemove = addOrRemove;
exports.addActivities = addActivities;
exports.getActivities = getActivities;
exports.addActivityPoint = addActivityPoint;
exports.deleteActivity = deleteActivity;
exports.updateActivity = updateActivity;