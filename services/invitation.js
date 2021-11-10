"use strict";
const encrypt = require("../permit/crypto.js");
var nodemailer = require('nodemailer')
let path = require('path');
const fs = require('fs');
const moment = require('moment');


const invitaionEmail = async (firstName, email, templatePath, subject, OTP) => {
    let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
    mailBody = mailBody.replace(/{{firstname}}/g, firstName);

    if (OTP) {
        mailBody = mailBody.replace(/{{OTP}}/g, OTP);
    }

    let smtpTransport = nodemailer.createTransport({
        host: 'localhost',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            user: `wondrfly@gmail.com`,
            pass: `wondrfly@123`
        }
    });


    let mailOptions = {
        from: "smtp.mailtrap.io",
        to: email, //sending to: E-mail
        subject: subject,
        html: mailBody,
        attachments: [
            {
                filename: 'logo.png',
                path: `${__dirname}/../public/images/logo.png`,
                cid: 'logo1'
            },

            {
                filename: 'logo_white.png',
                path: `${__dirname}/../public/images/logo_white.png`,
                cid: 'logo_white'
            }
        ]

    };
    let mailSent = await smtpTransport.sendMail(mailOptions);
    if (mailSent) {
        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return
    } else {
        log.end()
        throw new Error("Unable to send email try after sometime");
    }
}

const buildUser = async (model, context) => {
    const log = context.logger.start(`services:invitation:buildUser${model}`);
    const user = await new db.user({
        firstName: model.firstName,
        type: model.type || '',
        email: model.email,
        role: "parent",
        isActivated: false,
        password: model.password,
        betaUser: true,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return user;
};

const create = async (model, context) => {
    const log = context.logger.start("services:invitation:register");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("This Email is already registered");
    }
    model.password = await encrypt.getHash(model.password, context);
    const user = await buildUser(model, context);
    const invitedUser = await db.invitation.findOne({ invitedToEmail: { $eq: model.email } });
    if (user && !invitedUser) {
        const invitation = await new db.invitation({
            user: user.id,
            joined: true,
            bookedActivityFor: model.bookedActivityFor,
            lookingkidsActivityIn: model.lookingkidsActivityIn,
            lat: model.lat,
            lng: model.lng,
            bookedActivityInLastMonths: model.bookedActivityInLastMonths,
            wantWondrflyBetaUserBecause: model.wantWondrflyBetaUserBecause,
            occupation: model.occupation,
            willActive: model.willActive,
            createdOn: new Date(),
            updateOn: new Date()
        }).save();
    }
    if (invitedUser && user) {
        let webStatus = {}
        webStatus.requestAccepted = true
        invitedUser.user = user.id;
        invitedUser.joined = true;
        invitedUser.webStatus = webStatus;
        bookedActivityFor = model.bookedActivityFor;
        lookingkidsActivityIn = model.lookingkidsActivityIn;
        lat = model.lat;
        lng = model.lng;
        bookedActivityInLastMonths = model.bookedActivityInLastMonths;
        wantWondrflyBetaUserBecause = model.wantWondrflyBetaUserBecause;
        occupation = model.occupation;
        willActive = model.willActive;
        await invitedUser.save();
    }

    log.end();
    return user;
};

const getAllInvitation = async (context) => {
    const log = context.logger.start(`services:invitation:getAllInvitation`);
    let invitations = {}
    const invitation = await db.invitation.find({ joined: true }).populate('user').populate('invitedBy');
    const count = await db.invitation.count({ joined: true });
    const accepted = await db.invitation.find({ joined: true, "status.accepted": true }).count();
    const pending = await db.invitation.find({ joined: true, "status.pending": true }).count();
    const declined = await db.invitation.find({ joined: true, "status.declined": true }).count();
    const expired = await db.invitation.find({ joined: true, "status.expired": true }).count();
    invitations.invitation = invitation
    invitations.count = count
    invitations.accepted = accepted
    invitations.pending = pending
    invitations.declined = declined
    invitations.expired = expired
    log.end();
    return invitations;
};

const approveAll = async (model, context) => {
    const log = context.logger.start("services:invitation:approveAll");
    const invitation = await db.invitation.updateMany({
        $set: {
            'status.accepted': true,
            'status.pending': false, 'status.expired': false, 'status.declined': false
        }
    })
    const user = await db.user.updateMany({ betaUser: true }, {
        $set: {
            isActivated: true
        }
    })
    log.end();
    return invitation;
};

const approveOrDecline = async (model, context) => {
    const log = context.logger.start("services:invitation:approveOrDecline");
    const invitaton = await db.invitation.findById(model.id);
    if (model.type == "approve") {
        let invitation = await db.invitation.findByIdAndUpdate(model.id, {
            $set: {
                'status.accepted': true,
                'status.pending': false, 'status.expired': false, 'status.declined': false,
            },
        }, { new: true })
        if (invitation) {
            const user = await db.user.findByIdAndUpdate(invitaton.user, {
                $set: {
                    isActivated: true,
                }
            });
        }
        log.end();
        return invitation;
    }
    if (model.type == "decline") {
        let invitation = await db.invitation.findByIdAndUpdate(model.id, {
            $set: {
                'status.accepted': false,
                'status.pending': false, 'status.expired': false, 'status.declined': true
            }
        }, { new: true })
        log.end();
        return invitation;
    }
};

const inviteToJoin = async (model, context) => {
    const log = context.logger.start("services:invitation:inviteToJoin");
    const user = await db.user.findById(model.userId);
    if (!user) {
        throw new Error("This user does not exist");
    }
    if (user.parentInvitationLimit >= 3) {
        throw new Error("only 3 user invitation limit, your limit is reached");
    }

    const isEmail = await db.invitation.findOne({ invitedToEmail: { $eq: model.email } });
    if (isEmail) {
        throw new Error("This Email is already invited");
    }
    const invitation = await new db.invitation({
        invitedBy: model.userId,
        invitedToEmail: model.email,
        invitedToName: model.firstName,
        isInvited: "invited",
        createdOn: new Date(),
        updateOn: new Date()
    }).save();

    if (invitation) {
        await db.user.findByIdAndUpdate(model.userId, {
            $set: {
                parentInvitationLimit: user.parentInvitationLimit += 1
            }
        })
        let templatePath = '../emailTemplates/parent_invite_join.html';
        let subject = "Invitation to join wondrlfy";

        invitaionEmail(model.firstName, model.email, templatePath, subject);
    }
    log.end();
    return invitation;
};

const listByParentId = async (id, context) => {
    const log = context.logger.start("services:invitation:listByParentId");
    let invitations = await db.invitation.find({ invitedBy: id });
    const user = await db.user.findById(id)
    if (!user) {
        throw new Error('parent not found')
    }
    invitations.forEach(async invitation => {
        let threedays = moment(invitation.createdOn).add(3, 'd').toDate()
        let current = new Date()
        // let time = threedays <= current
        if (threedays <= current) {
            await db.user.findByIdAndUpdate(id, {
                $set: {
                    parentInvitationLimit: user.parentInvitationLimit -= 1
                }
            })
        }
    });
    log.end();
    return invitations;
};

exports.create = create;
exports.getAllInvitation = getAllInvitation;
exports.approveAll = approveAll;
exports.approveOrDecline = approveOrDecline;
exports.inviteToJoin = inviteToJoin;
exports.listByParentId = listByParentId;