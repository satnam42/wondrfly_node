"use strict";
const auth = require("./auth");
const response = require("../exchange/response");

const builder = (req, res, next) => {
  const context = {
    logger: require("@open-age/logger")("permit:context:builder")
  };

  req.context = context;
  if (next) {
    return next();
  }
  return null;
};

const validateToken = (req, res, next) => {
  builder(req, res);
  const log = req.context.logger.start(`permit:auth:validateToken`);

  const token = req.headers["x-access-token"];

  if (!token) {
    return response.failure(res, "token is required");
  }

  const details = auth.extractToken(token, req.context);

  if (details.name === "TokenExpiredError") {
    return response.failure(res, "token expired");
  }

  if (details.name === "JsonWebTokenError") {
    return response.failure(res, "token is invalid");
  }
  log.end();
  return next();
  //   return response.success(res, 'token is valid')
};

const requiresToken = async (req, res, next) => {
  builder(req, res);
  const log = req.context.logger.start(`permit:auth:requiresToken`);
  const token = req.headers["x-access-token"];
  if (!token) {
    return response.failure(res, "token is required");
  }
  const decodedUser = auth.extractToken(token, req.context);
  const user = await db.user.findById(decodedUser.id);
  if (!user) {
    return response.failure(res, "invalid user");
  }
  if (user.password != decodedUser.password) {
    return response.failure(res, "invalid password");
  }
  req.context.user = user;
  log.end();
  return next();
};

exports.builder = builder;
exports.requiresToken = requiresToken;
exports.validateToken = validateToken;
