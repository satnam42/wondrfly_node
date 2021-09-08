"use strict";
const encrypt = require("../permit/crypto.js");

const buildUser = async (model, context) => {
    const log = context.logger.start(`services:invitation:buildUser${model}`);
    const user = await new db.user({
        firstName: model.firstName,
        type: model.type || '',
        email: model.email,
        password: model.password,
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
    if (user) {
        const invitation = await new db.invitation({
            user: user.id,
            createdOn: new Date(),
            updateOn: new Date()
        }).save();
    }
    log.end();
    return user;
};

const getAllInvitation = async (context) => {
    const log = context.logger.start(`services:invitation:getAllInvitation`);
    let invitations = {}
    const invitation = await db.invitation.find().populate('user');
    const count = await db.invitation.count();
    const accepted = await db.invitation.find({ acceptance: true }).count();
    const pending = await db.invitation.find({ acceptance: false }).count();
    invitations.invitation = invitation
    invitations.count = `All Invitations ${count}`
    invitations.accepted = accepted
    invitations.pending = pending
    log.end();
    return invitations;
};

exports.create = create;
exports.getAllInvitation = getAllInvitation;