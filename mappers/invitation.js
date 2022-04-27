"use strict";
var moment = require('moment') // require for date formating

exports.toModel = entity => {
    let inviter = {}
    let approvedBy = {}
    if (entity.invitedBy) {
        inviter.name = entity.invitedBy.firstName
    }
    if (entity.approvedBy) {
        approvedBy.name = entity.approvedBy.firstName
        approvedBy.role = entity.approvedBy.role
    }
    let model = {
        invitation: entity.id,
        email: entity.invitedToEmail ? entity.invitedToEmail : entity.user.email,
        name: entity.invitedToName ? entity.invitedToName : entity.user.firstName,
        isInvited: entity.isInvited,
        inviter: inviter.name ? inviter.name : '',
        status: entity.status,
        joined: entity.joined,
        date: entity.createdOn,
        bookedActivityFor: entity.bookedActivityFor,
        lookingkidsActivityIn: entity.lookingkidsActivityIn,
        lat: entity.lat,
        lng: entity.lng,
        bookedActivityInLastMonths: entity.bookedActivityInLastMonths,
        wantWondrflyBetaUserBecause: entity.wantWondrflyBetaUserBecause,
        occupation: entity.occupation,
        willActive: entity.willActive,
        approvalDate: entity.approvalDate,
        user: entity.user._id,
        ipAddress: entity.user.ipAddress,
        approvedBy: approvedBy
    }
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};