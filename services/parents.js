const encrypt = require("../permit/crypto.js");
const imageUrl = require('config').get('image').url
const generator = require('generate-password');
const ObjectId = require("mongodb").ObjectID;
const auth = require("../permit/auth");
const moment = require('moment');

const setParent = (model, parent, context) => {
    const log = context.logger.start("services:parents:setParent");
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
    if (model.lng !== "string" && model.lng !== undefined) {
        parent.lng = model.lng;
    }
    if (model.location !== "string" && model.location !== undefined) {
        parent.location = model.location;
    }
    if (model.stripeToken !== "string" && model.stripeToken !== undefined) {
        parent.stripeToken = model.stripeToken;
    }
    if (model.stripeKey !== "string" && model.stripeKey !== undefined) {
        parent.stripeKey = model.stripeKey;
    }
    if (model.isAmbassador !== "string" && model.isAmbassador !== undefined) {
        parent.isAmbassador = model.isAmbassador;
    }
    parent.lastModifiedBy = context.user.id
    parent.updateOn = new Date()
    let user = parent
    log.end();
    user.save();
    return user;
};

const buildParent = async (model, context) => {
    const log = context.logger.start(`services:parents:buildParent${model}`);
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
        lng: model.lng,
        location: model.location,
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
    const log = context.logger.start("services:parents:addParent");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });

    if (isEmail) {
        return "Email already resgister";
    }
    let genPassword = generator.generate({
        length: 10,
        numbers: true
    });
    model.password = await encrypt.getHash(genPassword, context);
    const parent = buildParent(model, context);
    log.end();
    return parent;
};


const getList = async (query, context) => {
    const log = context.logger.start(`services:parents:getList`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let parents = await db.user.find({ $and: [{ role: 'parent' }, { isDeleted: false }] }).skip(skipCount).limit(pageSize);
    parents.count = await db.user.find({ $and: [{ role: 'parent' }, { isDeleted: false }] }).count();
    log.end();
    return parents;
};

const resetPassword = async (model, context) => {
    const log = context.logger.start(`service/parents/resetPassword: ${model}`);
    let user = context.user;
    const isMatched = encrypt.compareHash(
        model.oldPassword,
        user.password,
        context
    );
    if (isMatched) {
        const newPassword = encrypt.getHash(model.newPassword, context);
        user.password = newPassword;
        user.updatedOn = new Date();

        const token = auth.getToken(user, false, context);
        await user.save();
        let data = {
            toke: token,
            message: "Password Updated Successfully"
        }
        log.end();
        return data;
    } else {
        log.end();
        throw new Error("Old Password Not Match");
    }
};

const updateParent = async (id, model, context) => {
    const log = context.logger.start(`services:parents:updateParent`);
    const { firstName, lastName, phoneNumber } = model;
    let entity = await db.user.findById(id);
    if (!entity) {
        throw new Error("Parent Not Found");
    }
    const parent = await setParent(model, entity, context);

    if (parent) {
        const today = new Date()
        let date = moment(today).format('YYYY-MM-DD');
        let time = moment(today).format('hh:mm A');
        await new db.notification({
            title: 'update Profile',
            description: `Your profile has been updated.`,
            user: id,
            createdOn: new Date(),
            updateOn: new Date(),
        }).save();
    }
    log.end();
    return parent
};

const uploadProfilePic = async (id, file, context) => {
    const log = context.logger.start(`services:parents:uploadProfilePic`);
    let parent = await db.parent.findById(id);
    if (!req.file) {
        throw new Error("image not found");
    }
    if (!parent) {
        throw new Error("parent not found");
    }
    const avatarImages = imageUrl + model.profilePic
    parent.avatarImages = avatarImages
    parent.save();
    log.end();
    return parent
};

const activateAndDeactive = async (context, id, isActivated) => {
    const log = context.logger.start(`services:parents:activateAndDeactive`);
    if (!id) {
        throw new Error("parentId is requried");
    }
    if (!isActivated) {
        throw new Error("parent isActivated requried");
    }
    let parent = await db.parent.findById(id);
    if (!parent) {
        throw new Error("parent not found");
    }
    parent.isActivated = isActivated
    parent.lastModifiedBy = context.user.id
    parent.updatedOn = Date.now()
    parent.save()
    log.end();
    return parent
};

const getParent = async (id, context) => {
    const log = context.logger.start(`services:parents:update`);
    if (!id) {
        throw new Error("parent id is required");
    }
    let parent = await db.user.findById(id);
    if (!parent) {
        throw new Error("Parent Not Found");
    }
    log.end();
    return parent
};

exports.addParent = addParent;
exports.getList = getList;
exports.resetPassword = resetPassword;
exports.updateParent = updateParent;
exports.uploadProfilePic = uploadProfilePic;
exports.activateAndDeactive = activateAndDeactive
exports.getParent = getParent;