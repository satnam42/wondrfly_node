"use strict";
const auth = require("../permit/auth");
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = async (phone, message) => {
    const client = require('twilio')(accountSid, authToken);
    await client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        })
        .then(message => console.log(message.sid))
        .catch(err => {
            console.log('err ', err);
        })
}

const sendOtpSMS = async (model, context) => {
    const log = context.logger.start("services:twilio:sendOtpSMS");
    // four digit otp genration logic
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    const welcomeMessage = `Welcome to Wondrfly! Your verification code is:  ${OTP}`;
    await sendSms(model.phoneNumber, welcomeMessage);
    let otpToken = auth.getOtpToken(OTP, true, context)
    let data = {
        message: 'OTP successfully sent, kindly check your phone to activate your account!',
        otpToken: otpToken
    }
    log.end();
    return data
};


const otpVerify = async (model, context) => {
    const log = context.logger.start('services/users/otpVerified')
    const otp = await auth.extractToken(model.otpToken, context)
    if (!model.otpToken) {
        throw new Error("otpToken is required");
    }
    if (otp.id != model.otp) {
        throw new Error("please enter valid otp");;
    }
    if (otp.name === "TokenExpiredError") {
        throw new Error("otp expired");
    }
    if (otp.name === "JsonWebTokenError") {
        throw new Error("otp is invalid");
    }
    let user = await db.user.findById(model.userId);
    if (model.phoneNumber !== "string" && model.phoneNumber !== undefined && model.phoneNumber !== '') {
        user.phoneNumber = model.phoneNumber;
    }
    await user.save();

    let data = {
        message: 'otp verify successfully! your phone number is added',
    }
    log.end()
    return data
}

exports.sendOtpSMS = sendOtpSMS;
exports.otpVerify = otpVerify;