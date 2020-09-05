

"use strict";

const build = async (model, context) => {
    const log = context.logger.start(`services:claims:build${model}`);
    const claim = await new db.claim({
        requestOn: model.requestOn,
        requestBy: model.requestBy,
        status: 'in-progress',
        createdOn: new Date(),
    }).save();
    log.end();
    return claim;
};

const createRequest = async (model, context) => {
    const log = context.logger.start("services:claims:createRequest");
    const claimRequest = await db.claim.findOne({ requestOn: model.requestOn, requestBy: model.requestBy })
    if (claimRequest) {
        return "claim request already done";
    }
    const claim = build(model, context);
    log.end();
    return claim;
};

const getRequestList = async (context) => {
    const log = context.logger.start(`services:claims:getRequestList`);
    const claimRequests = await db.claim.find({}).populate('requestOn');
    if (claimRequests.length < 0) {
        throw new Error("claim Requests not found");
    }
    log.end();
    return claimRequests;
};

const getRequestListByProvider = async (query, context) => {
    const log = context.logger.start(`services:claims:getRequestListByProvider`);
    if (!query.id) {
        throw new Error("userId not found");
    }
    const claimsRequests = await db.claim.find({ requestBy: query.id }).populate('requestOn');
    if (!claimsRequests.length) {
        throw new Error("claims Requests not found");
    }
    log.end();
    return claimsRequests;
};

const actionOnRequest = async (id, model, context) => {
    const log = context.logger.start(`services:claims:actionOnRequest`);
    if (!id) {
        throw new Error("claim id not found");
    }
    let claim = await db.claim.findById(id)
    if (!claim) {
        throw new Error("claim request not found");
    }
    const user = db.user.findById(claim.requestOn)
    if (!user) {
        throw new Error("claim on provider not found");
    }
    const requestedUser = db.user.findById(claim.requestBy)

    if (requestedUser) {
        user.email = requestedUser.email
        user.password = requestedUser.password
    }
    else {
        throw new Error("requested user  id not found");
    }

    if (model.status == 'approve') {
        await db.user.deleteOne({ _id: claim.userId })
        let isRequestedUser = await db.child.findById(claim.requestBy);
        if (isRequestedUser) {
            throw new Error("something went wrong");
        }
        claim.status = 'approve'
        claim.updatedOn = new Date()
        await program.save()
        await claim.save()
        await user.save()
    }
    else {
        claim.status = 'reject'
        await claim.save()
    }
    log.end();
    return claim
};

exports.createRequest = createRequest;
exports.getRequestList = getRequestList;
exports.getRequestListByProvider = getRequestListByProvider;
exports.actionOnRequest = actionOnRequest;