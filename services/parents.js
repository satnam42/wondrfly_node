const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const path = require("path");
const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;

const setParent = (model, parent, context) => {
    const log = context.logger.start("services:parents:set");
    if (model.firstName !== "string" && model.firstName !== undefined) {
        parent.firstName = model.firstName;
    }
    if (model.lastName !== "string" && model.lastName !== undefined) {
        parent.lastName = model.lastName;
    }
    if (model.sex !== "string" && model.sex !== undefined) {
        parent.sex = model.sex;
    }
    if (model.phoneNumber !== "string" && model.phoneNumber !== undefined) {
        parent.phoneNumber = model.phoneNumber;
    }
    if (model.addressLine1 !== "string" && model.addressLine1 !== undefined) {
        parent.addressLine1 = model.addressLine1;
    }
    if (model.addressLine2 !== "string" && model.addressLine2 !== undefined) {
        parent.addressLine2 = model.addressLine2;
    }
    if (model.city !== "string" && model.city !== undefined) {
        parent.city = model.city;
    }
    if (model.country !== "string" && model.country !== undefined) {
        parent.country = model.country;
    }
    if (model.zipCode !== "string" && model.zipCode !== undefined) {
        parent.zipCode = model.zipCode;
    }
    if (model.lat !== "string" && model.lat !== undefined) {
        parent.lat = model.lat;
    }
    if (model.long !== "string" && model.long !== undefined) {
        parent.long = model.long;
    }
    if (model.stripeToken !== "string" && model.stripeToken !== undefined) {
        parent.stripeToken = model.stripeToken;
    }
    if (model.stripeKey !== "string" && model.stripeKey !== undefined) {
        parent.stripeKey = model.stripeKey;
    }
    if (model.stripeToken !== "string" && model.stripeToken !== undefined) {
        parent.stripeToken = model.stripeToken;
    }
    if (model.stripeToken !== "string" && model.stripeToken !== undefined) {
        parent.stripeToken = model.stripeToken;
    }
    if (model.stripeToken !== "string" && model.stripeToken !== undefined) {
        parent.stripeToken = model.stripeToken;
    }
    parent.lastModifiedBy = context.user.id,
        parent.updateOn = new Date()
    let user = parent
    log.end();

    user.save();
    return parent;
};

const buildParent = async (model, context) => {
    const log = context.logger.start(`services:parents:build${model}`);
    const parent = await new db.user({
        firstName: model.firstName,
        lastName: model.lastName,
        phoneNumber: model.phoneNumber,
        email: model.email,
        sex: model.sex,
        addressLine1: model.addressLine1,
        addressLine2: model.addressLine2,
        city: model.city,
        country: model.country,
        zipCode: model.zipCode,
        lat: model.lat,
        long: model.long,
        stripeToken: model.stripeToken,
        stripeKey: model.stripeKey,
        ssn: model.ssn,
        isActivated: model.isActivated,
        isDeleted: model.isDeleted,
        lastModifiedBy: model.lastModifiedBy,
        deletedBy: model.deletedBy,
        createdBy: context.user.id,
        role: 'parent',
        deviceToken: model.deviceToken,
        password: model.password,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return parent;
};


const addParent = async (model, context) => {
    const log = context.logger.start("services:parents:create");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        return "Email already resgister";
    }
    model.password = encrypt.getHash('123456', context);
    const parent = buildParent(model, context);
    log.end();
    return parent;
};


const get = async (query, context) => {
    const log = context.logger.start(`services:parents:get`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let parents
    if (query.role == 'all') {
        parents = await db.parent
            .find({})
            .skip(skipCount)
            .limit(pageSize);
        parents.count = await db.parent.find({}).count();
    }
    else {
        parents = await db.parent
            .find({ role: query.role })
            .skip(skipCount)
            .limit(pageSize);
        parents.count = await db.parent.find({ role: query.role }).count();
    }

    log.end();
    return parents;
};

const resetPassword = async (model, context) => {
    const log = context.logger.start(`service/parents/resetPassword: ${model}`);
    const parent = context.parent;
    const isMatched = encrypt.compareHash(
        model.oldPassword,
        parent.password,
        context
    );
    if (isMatched) {
        const newPassword = encrypt.getHash(model.newPassword, context);
        parent.password = newPassword;
        parent.updatedOn = new Date();
        await parent.save();
        log.end();
        return "Password Updated Successfully";
    } else {
        log.end();
        throw new Error("Old Password Not Match");
    }
};

const updateParent = async (id, model, context) => {
    const log = context.logger.start(`services:parents:update`);

    let entity = await db.parent.findById(id);
    if (!entity) {
        throw new Error("Parent Not Found");
    }

    const parent = await setParent(model, entity, context);

    log.end();
    return parent
};

const uploadProfilePic = async (req, context) => {

    const id = context.parent.id
    const log = context.logger.start(`services:parents:update`);
    let entity = await db.parent.findById(id);
    let = model = entity
    model.profilePic = req.file.filename
    if (!req.file) {
        throw new Error("image not found");
    }
    if (!entity) {
        throw new Error("invalid parent");
    }
    const parent = await setparent(model, entity, context);

    const picUrl = imageUrl + 'assets/images/' + model.profilePic
    parent.profilePic = picUrl
    return parent
    log.end();

};

const deleteParent = async (context, id) => {

    const log = context.logger.start(`services:parents:deleteparent`);
    if (!id) {
        throw new Error("parentId is requried");
    }
    let parent = await db.parent.findById(id);
    if (!parent) {
        throw new Error("parent not found");
    }

    parent.isDeleted = true
    parent.updatedOn = Date.now()
    parent.deletedBy = context.user.id,
        parent.save()
    log.end();
    return parent

};
const setparentStatus = async (context, id, status) => {
    const log = context.logger.start(`services:parents:setparentStatus`);
    if (!id) {
        throw new Error("parentId is requried");
    }
    if (!status) {
        throw new Error("parent status requried");
    }
    let parent = await db.parent.findById(id);
    if (!parent) {
        throw new Error("parent not found");
    }
    parent.status = status
    parent.updatedOn = Date.now()
    parent.save()
    return parent

};

exports.addParent = addParent;
exports.get = get;
exports.resetPassword = resetPassword;
exports.updateParent = updateParent;
exports.uploadProfilePic = uploadProfilePic;
exports.deleteParent = deleteParent
exports.setparentStatus = setparentStatus