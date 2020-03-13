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
  if (!req.body.lastName) {
    log.end();
    return response.failure(res, "lastName is required");
  }
  if (!req.body.phoneNumber) {
    log.end();
    return response.failure(res, "phone Number is required");
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

const addAddress = (req, res, next) => {
  const log = req.context.logger.start("validators:users:addAddress");
  if (req.body) {
    const { name, address, city, state, zipCode, specialInstruction, contactName, contactNumber, status, userId } = req.body;

    if (!name) {
      log.end();
      return response.failure(res, "name is required");
    }
    if (!address) {
      log.end();
      return response.failure(res, "address is required");
    }
    if (!city) {
      log.end();
      return response.failure(res, "city is required");
    }
    if (!state) {
      log.end();
      return response.failure(res, "state is required");
    }
    if (!zipCode) {
      log.end();
      return response.failure(res, "zipCode is required");
    }
    if (!contactNumber) {
      log.end();
      return response.failure(res, "contactNumber is required");
    }
    if (!userId) {
      log.end();
      return response.failure(res, "userId is required");
    }
  }
  else {
    log.end();
    return response.failure(res, "body is required");
  }

  log.end();
  return next();
};

const login = (req, res, next) => {
  if (!req.body) {
    log.end();
    return response.failure(res, "body is required");
  }
  const log = req.context.logger.start("validators:users:login");

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

exports.getById = getById;
exports.login = login;
exports.logout = logout;
exports.create = create;
exports.update = update;
exports.addAddress = addAddress;
exports.resetPassword = resetPassword;
