"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
  const log = req.context.logger.start("validators:users:create");
  if (!req.body) {
    log.end();
    return response.failure(res, "body is equired");
  }
  if (!req.body.firstName) {
    log.end();
    return response.failure(res, "firstName is required");
  }
  if (!req.body.role) {
    log.end();
    return response.failure(res, "role is required");
  }
  if (!req.body.email) {
    log.end();
    return response.failure(res, "email is required");
  }
  if (!req.body.password) {
    log.end();
    return response.failure(res, "password is required");
  }
  log.end();
  return next();
};



const login = (req, res, next) => {
  const log = req.context.logger.start("validators:users:login");
  if (!req.body) {
    log.end();
    return response.failure(res, "body is required");
  }
  if (!req.body.email) {
    log.end();
    return response.failure(res, "Email is required");
  }

  if (!req.body.password) {
    log.end();
    return response.failure(res, "Password is required");
  }
  log.end();
  return next();
};

const getById = (req, res, next) => {
  const log = req.context.logger.start("validators:users:getById");

  if (!req.params && !req.params.id) {
    log.end();
    return response.failure(res, "id is required");
  }
  log.end();
  return next();
};

const update = (req, res, next) => {
  const log = req.context.logger.start("validators:user:update");

  if (!req.body) {
    log.end();
    return response.failure(res, "body is required");
  }
  if (!req.params.id) {
    log.end();
    return response.failure(res, "user id is required");
  }

  log.end();
  return next();
};

const resetPassword = (req, res, next) => {
  const log = req.context.logger.start("validators:users:resetPassword");

  if (!req.body.newPassword) {
    log.end();
    return response.failure(res, "password is required");
  }

  if (!req.body.oldPassword) {
    log.end();
    return response.failure(res, "oldPassword is required");
  }
  log.end();
  return next();
};

const logout = (req, res, next) => {
  const log = req.context.logger.start("validators:users:logout");

  if (!req.body.device && !req.body.device.id) {
    log.end();
    return response.failure(res, "Device id is required");
  }

  if (!req.body.device && !req.body.device.type) {
    log.end();
    return response.failure(res, "Device type is required");
  }

  if (!req.body.device && !req.body.device.token) {
    log.end();
    return response.failure(res, "Device token is required");
  }

  log.end();
  return next();
};
const forgotPassword = (req, res, next) => {
  const log = req.context.logger.start("validators:users:forgotPassword");
  if (!req.body) {
    log.end();
    return response.failure(res, "body is required");
  }
  if (!req.body.otpToken) {
    log.end();
    return response.failure(res, "otpToken is required");
  }
  if (!req.body.email) {
    log.end();
    return response.failure(res, "email is required");
  }
  if (!req.body.newPassword) {
    log.end();
    return response.failure(res, "Password is required");
  }
  log.end();
  return next();
};
const tellAFriend = (req, res, next) => {
  const log = req.context.logger.start("validators:users:create");
  if (!req.body) {
    log.end();
    return response.failure(res, "body is equired");
  }
  if (!req.body.fullName) {
    log.end();
    return response.failure(res, "fullName is required");
  }
  if (!req.body.email) {
    log.end();
    return response.failure(res, "email is required");
  }
  if (!req.body.parentName) {
    log.end();
    return response.failure(res, "ParentName is required");
  }
  log.end();
  return next();
};

exports.getById = getById;
exports.login = login;
exports.logout = logout;
exports.create = create;
exports.update = update;
exports.resetPassword = resetPassword;
exports.forgotPassword = forgotPassword;
exports.tellAFriend = tellAFriend;
