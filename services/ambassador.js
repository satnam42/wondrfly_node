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



const getAmbassadors = async (id, context) => {

    const log = context.logger.start('services:ambassador:getAmbassadors');
    const user = await db.user.find({ isAmbassador: "true" });
    log.end();
    return user;

};

exports.getAmbassadors = getAmbassadors;