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
        points: nmbr,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return point;
};

const addOrRemove = async (model, context) => {
    const log = context.logger.start("services:ambassador:addOrRemove");
    let user = await db.user.findById(model.userId);
    console.log('model ===>>>>', model);
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

// let islike = await db.like.findOne({ creator: model.userId, post: model.postId });
// let like
// if (!islike) {
//     post.likesCount += 1
//     await post.save();
//     like = build(model, context);
// } else {
//     await db.like.findOneAndDelete({ creator: model.userId, post: model.postId }, function (err, docs) {
//         console.log('err', err);
//     });
//     post.likesCount -= 1
//     await post.save();
// }


const getAmbassadors = async (id, context) => {

    const log = context.logger.start('services:ambassador:getAmbassadors');
    const user = await db.user.find({ isAmbassador: "true" }).populate('rewardpointIds');
    log.end();
    return user;

};

exports.getAmbassadors = getAmbassadors;
exports.addOrRemove = addOrRemove;