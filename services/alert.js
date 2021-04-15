"use strict";

const build = async (model, context) => {
    const { fromDate, toDate, msg, email, alertFor, msgType } = model;
    const log = context.logger.start(`services:alert:build${model}`);
    const alert = await new db.alert({
        email: email,
        fromDate: fromDate,
        toDate: toDate,
        msg: msg,
        msgType: msgType,
        alertFor: alertFor,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return alert;
};

const setAlert = async (model, alert, context) => {
    const log = context.logger.start("services:alert:set");
    if (model.email !== "string" && model.email !== undefined) {
        alert.email = model.email;
    }
    if (model.fromDate !== "string" && model.fromDate !== undefined) {
        alert.fromDate = model.fromDate;
    }
    if (model.toDate !== "string" && model.toDate !== undefined) {
        alert.toDate = model.toDate;
    }
    if (model.msg !== "string" && model.msg !== undefined) {
        alert.msg = model.msg;
    }
    if (model.msgType !== "string" && model.msgType !== undefined) {
        alert.msgType = model.msgType;
    }
    if (model.role !== "string" && model.role !== undefined) {
        alert.role = model.role;
    }
    if (model.alertFor !== "string" && model.alertFor !== undefined) {
        alert.alertFor = model.alertFor;
    }

    log.end();
    await alert.save();
    return alert;
}

const create = async (model, context) => {
    const log = context.logger.start("services:alert:create");
    const isalertExist = await db.alert.findOne({ msg: { $eq: model.msg } });
    if (isalertExist) {
        throw new Error("alert is already exist");
    }

    const alert = build(model, context);
    console.log('alert', alert);
    log.end();
    return alert;
};

const getAllalert = async (context) => {
    const log = context.logger.start(`services:alert:getAllalert`);
    const alerts = await db.alert.find();
    log.end();
    return alerts;
};

const update = async (model, context) => {
    const log = context.logger.start(`services:users:update`);
    if (!model.alertId) {
        throw new Error("alert id is required");
    }

    let entity = await db.alert.findOne({ _id: model.alertId });
    if (!entity) {
        throw new Error("invalid alert");
    }
    const alert = await setAlert(model, entity, context);
    log.end();
    return alert
};

const deleteAlert = async (id, context) => {
    const log = context.logger.start(`services:users:deleteAlert:${id}`);
    if (!id) {
        throw new Error("alert id is required");
    }
    await db.alert.deleteOne({ _id: id });
    log.end();
    return 'Alert Deleted Successfully'
};


const showAlert = async (context) => {
    const log = context.logger.start(`services:alert:showAlert`);
    const alert = await db.alert.findOne({}).sort({ _id: -1 }).limit(1);
    log.end();
    return alert;
};

const deactivateAlert = async (model, context) => {
    const log = context.logger.start(`services:users:deactivateAlert`);
    if (!model.userId) {
        throw new Error("user id is required");
    }
    if (!model.alertId) {
        throw new Error("alert id is required");
    }

    let user = await db.user.findOne({ _id: model.userId });

    user.disableAlert = model.alertId;

    log.end();
    await user.save();
    return "alert is disabled";
};


exports.create = create;
exports.getAllalert = getAllalert;
exports.update = update;
exports.deleteAlert = deleteAlert;
exports.showAlert = showAlert;
exports.deactivateAlert = deactivateAlert;