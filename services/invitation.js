"use strict";
const encrypt = require("../permit/crypto.js");

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
            createdOn: new Date(),
            updateOn: new Date()
        }).save();
    }
    if (invitedUser && user) {
        let webStatus = {}
        webStatus.requestAccepted = true
        invitedUser.user = user.id;
        invitedUser.joined = true;
        invitedUser.webStatus = webStatus
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
// parentInvitationLimit
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
    }
    log.end();
    return invitation;
};

const listByParentId = async (id, context) => {
    const log = context.logger.start("services:invitation:listByParentId");
    let invitation = await db.invitation.find({ invitedBy: id });
    log.end();
    return invitation;
};

exports.create = create;
exports.getAllInvitation = getAllInvitation;
exports.approveAll = approveAll;
exports.approveOrDecline = approveOrDecline;
exports.inviteToJoin = inviteToJoin;
exports.listByParentId = listByParentId;