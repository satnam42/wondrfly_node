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
        .then(message => console.log(message.sid));
}


const build = async (model, context) => {
    // const { fromDate, toDate, msg, email, alertFor, msgType } = model;
    const log = context.logger.start(`services:twilio:build${model}`);
    // const alert = await new db.alert({
    //     email: email,
    //     fromDate: fromDate,
    //     createdOn: new Date(),
    //     updateOn: new Date(),
    // }).save();
    // log.end();
    // return ;
};

const sendOtpSMS = async (model, context) => {
    const log = context.logger.start("services:twilio:sendOtpSMS");
    // four digit otp genration logic
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log('OTP =>>>', OTP);
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

exports.sendOtpSMS = sendOtpSMS;