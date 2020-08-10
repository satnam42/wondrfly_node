

"use strict";

const build = async (model, context) => {
    const log = context.logger.start(`services:claims:build${model}`);
    const claim = await new db.claim({
        requestBy: model.providerId,
        approvedrBy: model.userId,
        requestOn: model.programId,
        status: 'in-progress',
        createdOn: new Date(),
    }).save();
    log.end();
    return claim;
};

const createRequest = async (model, context) => {
    const log = context.logger.start("services:claims:create");
    const claimRequest = await db.claim.findOne({ $and: [{ requestBy: model.providerId }, { requestOn: model.programId }] })
    if (claimRequest) {
        return "claim already done";
    }
    const claim = build(model, context);
    log.end();
    return claim;
};

const getRequestList = async (context) => {
    const log = context.logger.start(`services:claims:getAllclaims`);
    const claimRequests = await db.claim.find({}).populate('program');
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
    const claimsRequests = await db.claim.find({ requestBy: query.userId }).populate('program');
    if (claimsRequests.length < 0) {
        throw new Error("claims Requests not found");
    }
    log.end();
    return claimsRequests;
};

const actionOnRequest = async (query, context) => {
    const log = context.logger.start(`services:claims:removeById`);
    if (!id) {
        throw new Error("claim id not found");
    }
    let claim = await db.claim.findById(query.claimId)
    let program = await db.program.findById(query.programI)
    if (!program) {
        throw new Error("Program  not found");

    }
    if (query.claimStatus == 'approve') {
        claim.status = 'approve'
        program.user = query.userId
        await program.save()
        await claim.save()
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