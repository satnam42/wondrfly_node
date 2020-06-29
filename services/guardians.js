

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
    const guardian = await new db.guardian({
        name: model.firstName,
        age: model.age,
        avtar: model.avtar,
        sex: model.sex,
        parent: model.parentId,
        personalNote: model.personalNote,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return guardian;
};


const addGuardian = async (model, context) => {
    const log = context.logger.start("services:guardians:create");
    const guardian = buildGuardian(model, context);
    log.end();
    return guardian;
};


const get = async (query, context) => {
    const log = context.logger.start(`services:guardians:get`);
    let guardians = await db.guardian.find({})
    log.end();
    return guardians;
};


const updateGuardian = async (id, model, context) => {
    const log = context.logger.start(`services:guardians:update`);

    let entity = await db.guardian.findById(id);
    if (!entity) {
        throw new Error("guardian Not Found");
    }

    const guardian = await setGuardian(model, entity, context);

    log.end();
    return guardian
};
const getGuardianByParentId = async (id, model, context) => {
    const log = context.logger.start(`services:guardians:getGuardianByParentId`);
    if (!id) {
        throw new Error("parentId Not Found");
    }
    let guardians = await db.guardian.find({ parent: id });
    if (!entity) {
        throw new Error("guardian Not Found");
    }
    log.end();
    return guardians
};
exports.addGuardian = addGuardian;
exports.get = get;
exports.updateGuardian = updateGuardian;
exports.getGuardianByParentId = getGuardianByParentId;