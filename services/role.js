"use strict";

const create = async (model, context) => {
    const log = context.logger.start("services:role:create");
    const isroleExist = await db.role.findOne({ roleName: { $eq: model.roleName.toLowerCase() } });
    if (isroleExist) {
        throw new Error("role is already exist");
    }
    const role = await new db.role({
        roleName: model.roleName.toLowerCase(),
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();

    log.end();
    return role;
};

const getAllrole = async (context) => {
    const log = context.logger.start(`services:role:getAllrole`);
    const roles = await db.role.find();
    log.end();
    return roles;
};


exports.create = create;
exports.getAllrole = getAllrole;