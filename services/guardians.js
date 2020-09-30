
const ObjectId = require("mongodb").ObjectID;
const setGuardian = (model, guardian, context) => {
    const log = context.logger.start("services:guardians:set");
    if (model.name !== "string" && model.name !== undefined) {
        guardian.firstName = model.name;
    }
    if (model.age !== "string" && model.age !== undefined) {
        guardian.age = model.age;
    }
    if (model.sex !== "string" && model.sex !== undefined) {
        guardian.sex = model.sex;
    }
    if (model.personalNote !== "string" && model.personalNote !== undefined) {
        guardian.personalNote = model.personalNote;
    }
    guardian.updateOn = new Date()
    log.end();
    guardian.save();
    return guardian;
};

const buildGuardian = async (model, context) => {
    const log = context.logger.start(`services:guardians:build${model}`);
    const user = await new db.user({
        firstName: model.firstName,
        avtar: model.avtar,
        email: model.email,
        sex: model.sex,
        password: '123456',
        role: 'guardian',
        personalNote: model.personalNote,
        createdOn: new Date(),
        updatedOn: new Date()
    }).save();
    log.end();
    return user;
};

const addGuardian = async (model, context) => {
    const log = context.logger.start("services:guardians:create");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already resgister");
    }
    const guardian = await buildGuardian(model, context);
    if (guardian) {
        await new db.guardian({
            parent: model.parentId,
            user: guardian.id,
            createdOn: new Date(),
            updatedOn: new Date()
        }).save();
    }
    log.end();
    return guardian;
};


const get = async (query, context) => {
    const log = context.logger.start(`services:guardians:get`);
    let guardians = await db.guardian.find({}).populate('user')
    log.end();
    return guardians;
};


const updateGuardian = async (id, model, context) => {
    const log = context.logger.start(`services:guardians:update`);

    let entity = await db.user.findById(id);
    if (!entity) {
        throw new Error("guardian Not Found");
    }

    const guardian = await setGuardian(model, entity, context);

    log.end();
    return guardian.user
};

const getGuardianByParentId = async (id, context) => {
    const log = context.logger.start(`services:guardians:getGuardianByParentId`);
    if (!id) {
        throw new Error("parentId Not Found");
    }
    let guardians = await db.guardian.find({ parent: id }).populate('user')
    if (!guardians.length) {
        throw new Error("guardian Not Found");
    }
    log.end();
    return guardians
};

const deleteGuardian = async (id, context) => {
    const log = context.logger.start(`services:guardians:deleteGuardian`);
    if (!id) {
        throw new Error("Id is requried");
    }
    let user = await db.user.findById(id);
    if (!user) {
        throw new Error("guardian not found");
    }
    await db.guardian.deleteOne({ user: id })
    await db.user.deleteOne({ _id: id })
    user = null
    user = await db.user.findById(id);
    if (user) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'guardian delete successfully'
};

exports.addGuardian = addGuardian;
exports.get = get;
exports.updateGuardian = updateGuardian;
exports.getGuardianByParentId = getGuardianByParentId;
exports.deleteGuardian = deleteGuardian;