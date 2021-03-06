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
        return "claim request already registered";
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

// const actionOnRequest = async (id, model, context) => {
//     const log = context.logger.start(`services:claims:actionOnRequest`);
//     if (!id) {
//         throw new Error("claim id not found");
//     }
//     let claim = await db.claim.findById(id)
//     if (!claim) {
//         throw new Error("claim request not found");
//     }
//     let user = await db.user.findById(model.requestOn)
//     if (!user) {
//         throw new Error("claim on provider not found");
//     }

//     const requestedUser = await db.user.findById(model.requestBy)

//     if (requestedUser) {
//         user.email = requestedUser.email
//         user.password = requestedUser.password
//     }

//     else {
//         throw new Error("requested user  not found");
//     }

//     if (model.status == 'approve') {

//         const filter = { _id: model.requestBy };
//         const update = {};
//         update.email = ""
//         update.password = ""
//         update.isClaimed = true
//         let isClaimed = await db.user.findOneAndUpdate(filter, { $set: update }, { new: true })

//         if (isClaimed.email !== "") {
//             throw new Error("something went wrong");
//         }

//         // claim.requestOn = model.requestBy
//         claim.status = 'approve'
//         claim.updatedOn = new Date()
//         await claim.save()
//         await user.save()
//     }
//     else {
//         claim.status = 'reject'
//         await claim.save()
//     }
//     log.end();
//     return claim
// };


const actionOnRequest = async (id, model, context) => {
    const log = context.logger.start(`services:claims:actionOnRequest`);
    if (!id) {
        throw new Error("claim id not found");
    }
    let claim = await db.claim.findById(id)
    if (!claim) {
        throw new Error("claim request not found");
    }
    let claimedUser = await db.user.findById(model.requestOn)
    if (!claimedUser) {
        throw new Error("claim on provider not found");
    }

    const requestedUser = await db.user.findById(model.requestBy)
    if (!requestedUser) {
        throw new Error("requested user  not found");
    }

    if (model.status == 'approve') {

        let claimedPrograms = await db.program.find({ user: model.requestOn })
        claimedPrograms.forEach(async (progrm, index) => {
            await db.program.findByIdAndUpdate(progrm.id, {
                $set: {
                    user: model.requestBy,
                }
            });
        });

        await db.user.deleteOne({ _id: model.requestOn });
        claim.status = 'approve'
        claim.updatedOn = new Date()
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